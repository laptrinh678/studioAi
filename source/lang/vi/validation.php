<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines contain the default error messages used by
    | the validator class. Some of these rules have multiple versions such
    | as the size rules. Feel free to tweak each of these messages.
    |
    */
    'max_duration'          => 'Thời lượng âm thanh tối đa 30 giây. Kết quả thời lượng hiện tại là :duration',
    'max_queue'             => 'Hàng chờ đang quá tải, vui lòng thử lại sau.',
    'project_name_required' => 'Tên dự án không được để trống.',
    'project_name_unique'   => 'Tên dự án này đã tồn tại.',

    'accepted'              => 'Trường :attribute phải được chấp nhận.',
    'active_url'            => 'Trường :attribute không phải là một URL hợp lệ.',
    'after'                 => 'Trường :attribute phải là một ngày sau ngày :date.',
    'after_or_equal'        => 'Trường :attribute phải là thời gian bắt đầu sau hoặc đúng bằng :date.',
    'alpha'                 => 'Trường :attribute chỉ có thể chứa các chữ cái.',
    'alpha_dash'            => 'Trường :attribute chỉ có thể chứa chữ cái, số và dấu gạch ngang.',
    'alpha_num'             => 'Trường :attribute chỉ có thể chứa chữ cái và số.',
    'array'                 => 'Trường :attribute phải là dạng mảng.',
    'before'                => 'Trường :attribute phải là một ngày trước ngày :date.',
    'before_or_equal'       => 'Trường :attribute phải là thời gian bắt đầu trước hoặc đúng bằng :date.',
    'between'   => [
        'numeric'           => 'Trường :attribute phải nằm trong khoảng :min - :max.',
        'file'              => 'Dung lượng tập tin trong trường :attribute phải từ :min - :max kB.',
        'string'            => 'Trường :attribute phải từ :min - :max ký tự.',
        'array'             => 'Trường :attribute phải có từ :min - :max phần tử.',
    ],
    'boolean'               => 'Trường :attribute phải là true hoặc false.',
    'confirmed'             => 'Giá trị xác nhận trong trường :attribute không khớp.',
    'date'                  => 'Trường :attribute không phải là định dạng của ngày-tháng.',
    'date_format'           => 'Trường :attribute không giống với định dạng :format.',
    'different'             => 'Trường :attribute và :other phải khác nhau.',
    'digits'                => 'Độ dài của trường :attribute phải gồm :digits chữ số.',
    'digits_between'        => 'Độ dài của trường :attribute phải nằm trong khoảng :min and :max chữ số.',
    'dimensions'            => 'Trường :attribute có kích thước không hợp lệ.',
    'distinct'              => 'Trường :attribute có giá trị trùng lặp.',
    'email'                 => 'Trường :attribute phải là một địa chỉ email hợp lệ.',
    'exists'                => 'Giá trị đã chọn trong trường :attribute không hợp lệ.',
    'file'                  => 'Trường :attribute phải là một tệp tin.',
    'filled'                => 'Trường :attribute không được bỏ trống.',
    'gt'        => [
        'numeric'           => 'Giá trị trường :attribute phải lớn hơn :value.',
        'file'              => 'Dung lượng trường :attribute phải lớn hơn :value kilobytes.',
        'string'            => 'Độ dài trường :attribute phải nhiều hơn :value kí tự.',
        'array'             => 'Mảng :attribute phải có nhiều hơn :value phần tử.',
    ],
    'gte'       => [
        'numeric'           => 'Giá trị trường :attribute phải lớn hơn hoặc bằng :value.',
        'file'              => 'Dung lượng trường :attribute phải lớn hơn hoặc bằng :value kilobytes.',
        'string'            => 'Độ dài trường :attribute phải lớn hơn hoặc bằng :value kí tự.',
        'array'             => 'Mảng :attribute phải có ít nhất :value phần tử.',
    ],
    'image'                 => 'Trường :attribute phải là định dạng hình ảnh.',
    'in'                    => 'Giá trị đã chọn trong trường :attribute không hợp lệ.',
    'in_array'              => 'Trường :attribute phải thuộc tập cho phép: :other.',
    'integer'               => 'Trường :attribute phải là một số nguyên.',
    'ip'                    => 'Trường :attribute phải là một địa chỉ IP.',
    'ipv4'                  => 'Trường :attribute phải là một địa chỉ IPv4.',
    'ipv6'                  => 'Trường :attribute phải là một địa chỉ IPv6.',
    'json'                  => 'Trường :attribute phải là một chuỗi JSON.',
    'lt'        => [
        'numeric'           => 'Giá trị trường :attribute phải nhỏ hơn :value.',
        'file'              => 'Dung lượng trường :attribute phải nhỏ hơn :value kilobytes.',
        'string'            => 'Độ dài trường :attribute phải nhỏ hơn :value kí tự.',
        'array'             => 'Mảng :attribute phải có ít hơn :value phần tử.',
    ],
    'lte'       => [
        'numeric'           => 'Giá trị trường :attribute phải nhỏ hơn hoặc bằng :value.',
        'file'              => 'Dung lượng trường :attribute phải nhỏ hơn hoặc bằng :value kilobytes.',
        'string'            => 'Độ dài trường :attribute phải nhỏ hơn hoặc bằng :value kí tự.',
        'array'             => 'Mảng :attribute không được có nhiều hơn :value phần tử.',
    ],
    'max'       => [
        'numeric'           => 'Trường :attribute không được lớn hơn :max.',
        'file'              => 'Dung lượng tập tin trong trường :attribute không được lớn hơn :max kB.',
        'string'            => 'Trường :attribute không được lớn hơn :max ký tự.',
        'array'             => 'Trường :attribute không được lớn hơn :max phần tử.',
    ],
    'mimes'                 => 'Trường :attribute phải là một tập tin có định dạng: :values.',
    'mimetypes'             => 'Trường :attribute phải là một tập tin có định dạng: :values.',
    'min'       => [
        'numeric'           => 'Trường :attribute phải tối thiểu là :min.',
        'file'              => 'Dung lượng tập tin trong trường :attribute phải tối thiểu :min kB.',
        'string'            => 'Trường :attribute phải có tối thiểu :min ký tự.',
        'array'             => 'Trường :attribute phải có tối thiểu :min phần tử.',
    ],
    'not_in'                => 'Giá trị đã chọn trong trường :attribute không hợp lệ.',
    'not_regex'             => 'Trường :attribute có định dạng không hợp lệ.',
    'numeric'               => 'Trường :attribute phải là một số.',
    'present'               => 'Trường :attribute phải được cung cấp.',
    'regex'                 => 'Trường :attribute có định dạng không hợp lệ.',
    'required'              => 'Trường :attribute không được bỏ trống.',
    'required_if'           => 'Trường :attribute không được bỏ trống khi trường :other là :value.',
    'required_unless'       => 'Trường :attribute không được bỏ trống trừ khi :other là :values.',
    'required_with'         => 'Trường :attribute không được bỏ trống khi một trong :values có giá trị.',
    'required_with_all'     => 'Trường :attribute không được bỏ trống khi tất cả :values có giá trị.',
    'required_without'      => 'Trường :attribute không được bỏ trống khi một trong :values không có giá trị.',
    'required_without_all'  => 'Trường :attribute không được bỏ trống khi tất cả :values không có giá trị.',
    'same'                  => 'Trường :attribute và :other phải giống nhau.',
    'size'      => [
        'numeric'           => 'Trường :attribute phải bằng :size.',
        'file'              => 'Dung lượng tập tin trong trường :attribute phải bằng :size kB.',
        'string'            => 'Trường :attribute phải chứa :size ký tự.',
        'array'             => 'Trường :attribute phải chứa :size phần tử.',
    ],
    'string'                => 'Trường :attribute phải là một chuỗi ký tự.',
    'timezone'              => 'Trường :attribute phải là một múi giờ hợp lệ.',
    'unique'                => ':attribute đã tồn tại.',
    'uploaded'              => 'Trường :attribute tải lên thất bại.',
    'url'                   => 'Trường :attribute không giống với định dạng một URL.',
    'not_equal'             => 'Sai mật khẩu',
    'cant_equal'            => 'Mật khẩu mới không được phép giống mật khẩu cũ',
    'cant_depart_user'      => 'Phòng này đang được gán cho người dùng khác, không thể xóa!',
    'cant_depart_admin'     => 'Phòng này đang được gán cho :roles, không thể xóa!',
    'cant_room_meeting'     => 'Phòng họp này đã gán cho cuộc họp, không thể xóa',
    'cant_del_admin'        => 'Không thể xóa tài khoản này, tài khoản đang là quyền admin!',
    'delete_role'           => 'Nhóm người dùng này đang được gán cho người dùng khác, không thể xóa!',
    'delete_perm'           => 'Quyền người dùng này đang được gán cho nhóm người dùng khác, không thể xóa!',
    'delete_position'       => 'Chức vụ này đang được gán cho người dùng khác, không thể xóa!',
    'delete_stage'          => 'Giai đoạn này đang được gán cho người dùng, không thể xóa!',
    'delete_timeframe'      => 'Khung thời gian làm việc đang được gán cho người dùng khác, không thể xóa!',

    'request_id' => [
        'empty' => 'request_id is empty',
        'invalid' => 'request_id is invalid'
    ],
    'request_type' => [
        'empty' => 'request_type is empty',
        'invalid' => 'request_type is invalid'
    ],
    'package_type' => [
        'empty' => 'package_type is empty',
        'invalid' => 'package_type is invalid'
    ],
    'expiry_date' => [
        'empty' => 'expiry_date is empty',
        'invalid' => 'expiry_date is invalid'
    ],
    'extend_month' => [
        'empty' => 'extend_month is empty',
        'invalid' => 'extend_month is invalid'
    ],
    'package' => [
        'activate' => 'package has been active',
        'not_active' => 'package not in process'
    ],
    'server_error' => 'server internal error',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. This makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | The following language lines are used to swap attribute place-holders
    | with something more reader friendly such as E-Mail Address instead
    | of "email". This simply helps us make messages a little cleaner.
    |
    */

    'attributes' => [
        'email'             => 'Địa chỉ email',
        'phone'             => 'Số điện thoại',
        'document_number'   => 'Số CMND'
    ],
];
