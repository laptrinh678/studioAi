<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserRepository extends BaseRepository
{
    public function model()
    {
      return User::class;
    }

    public function getList($params)
    {
        $perPage = $params['per_page'];
        $keyword = $params['keyword'];

        return $this->model->with(['groups:id,name'])
            ->when($keyword, function ($q) use ($keyword) {
                return $q->where('display_name', 'like', "%$keyword%")
                ->orWhere('user_name', $keyword)
                ->orWhere('email', $keyword);
            })
            ->orderBy('id', 'desc')
            ->paginate($perPage);
    }

    public function store($params)
    {
        $user = new $this->model;

        $user->fill($params);
        $user->password = Hash::make($params['password']);

        $user->save();

        foreach ($params['group_ids'] as $key => $groupIds) {
            $pivot[$groupIds] = ['permission' => $params['permissions'][$key]];
        }

        $user->groups()->attach($pivot);

        return true;
    }

    public function update($id, $params)
    {
        if (!$this->model::isAdminRoot() && \Auth::user()->id != $id) {
            abort(403);
        }

        $user = $this->model->findOrFail($id);

        $user->fill($params);

        $user->save();

        foreach ($params['group_ids'] as $key => $groupIds) {
            $pivot[$groupIds] = ['permission' => $params['permissions'][$key]];
        }

        $user->groups()->sync($pivot);

        return true;
    }

    public function destroy($id)
    {
        $user = $this->model->findOrFail($id);

        $user->groups()->detach();
        return $this->model->where('id', $id)->delete();
    }

    public function updateProfile($arr)
    {
        $user = \Auth::user();

        $user->email = $arr['email'];
        $user->display_name = $arr['display_name'];
        $user->user_name = $arr['user_name'];
        $user->phone = $arr['phone'];

        return $user->save();
    }

    public function changePassword($arr)
    {
        $user = \Auth::user();
        $user->password = Hash::make($arr['new_password']);
        return $user->save();
    }
}
