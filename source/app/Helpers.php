<?php

use App\Repositories\UserRepository;

if (!function_exists('includeRouteFiles')) {

    /**
     * Loops through a folder and requires all PHP files
     * Searches sub-directories as well.
     *
     * @param $folder
     */
    function includeRouteFiles($folder)
    {
        try {
            $rdi = new recursiveDirectoryIterator($folder);
            $it = new recursiveIteratorIterator($rdi);

            while ($it->valid()) {
                if (!$it->isDot() && $it->isFile() && $it->isReadable() && $it->current()->getExtension() === 'php') {
                    require $it->key();
                }

                $it->next();
            }
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }
}

if (!function_exists('queryImplode')) {

    /**
     *
     * implode with single quote for query raw
     * @param $glue
     * @param $array
     * @return bool|string
     */
    function queryImplode($glue, $array)
    {
        $str = "";
        foreach ($array as $e) {
            if ($e != null) {
                $str .= "'" . $e . "'" . $glue;
            }
        }
        return substr($str, 0, -(strlen($glue)));
    }
}
/**
 * get base dataTable request params
 * @param $request
 * @return array
 */
function getDataTableRequestParams($request)
{
    $start = $request->input('start');
    $length = $request->input('length');
    $draw = $request->input('draw');

    $order = $request->input('order');
    $columns = $request->input('columns');
    $search = $request->input('search');
    $keyword = $search['value'];

    if ($order) {
        $num = $order[0]['column'];
        $orderBy = $columns[$num]['data'];
        $orderType = $order[0]['dir'];

        return [
            'start' => $start,
            'length' => $length,
            'draw' => $draw,
            'orderBy' => $orderBy,
            'orderType' => $orderType,
            'keyword' => $keyword
        ];
    } else

        return [
            'start' => $start,
            'length' => $length,
            'draw' => $draw,
            'orderBy' => null,
            'orderType' => null,
            'keyword' => $keyword
        ];
}

/**
 * @param $result
 * @param null $data
 * @return \Illuminate\Http\JsonResponse
 */
function processCommonResponse($result, $data = null)
{
    $code = 0;

    if($result === true){
        $code = CODE_SUCCESS;
    } else if($result === false) {
        $code = CODE_ERROR;
    } else if($result === 2) {
        $code = CODE_ERROR_ACTIVE_CONFIG_WHEN_SMS_TYPE_DISABLE;
    } else if($result === 3) {
        $code = CODE_ERROR_DISABLE_SMS_TYPE_WHEN_CONFIG_ACTIVE;
    } else if($result ===4) {
        $code = CODE_ERROR_DISABLE_SMS_GROUP_WHEN_SMS_TYPE_ACTIVE;
    }

    return response()->json(array(
        'code' => $code,
        'message' => $result ? MESSAGE_SUCCESS : MESSAGE_ERROR,
        'data' => $data
    ));
}

function formatDatetimeToNormalDate($datetime)
{
    if (!$datetime) return '';

    return \Carbon\Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->format('d/m/Y');
}

function formatDate($date)
{
    if (!$date) return '';
    $dateFormat = date_create($date);
    return date_format($dateFormat, "d/m/Y");
}


function detectCarrier($data)
{
    $viettelPrefix = ["84162", "84163", "84164", "84165", "84166", "84167", "84168", "84169", "8486", "8496", "8497", "8498", "8432", "8434", "8436", "8438", "8433", "8435", "8437", "8439"];
    $vinaPrefix = ["84123", "84124", "84125", "84127", "84129", "8488", "8491", "8494", "8483", "8484", "8485", "8481", "8482"];
    $mobiPrefix = ["84120", "84121", "84122", "84126", "84128", "8489", "8490", "8493", "8470", "8479", "8477", "8476", "8478"];
    $vietnammobilePrefix = ["84186", "84188", "8492", "8456", "8458", "8452"];
    $gmobilePrefix = ["84199", "8499", "8459"];

    $carrier = null;
    $num = substr($data, 0, 5);

    foreach ($viettelPrefix as $item) {
        if (strpos($num, $item) === 0) {
            $carrier = "VIETTEL";
        }
    }


    foreach ($vinaPrefix as $item) {
        if (strpos($num, $item) === 0) {
            $carrier = "VINAPHONE";
        }
    }


    foreach ($vinaPrefix as $item) {
        if (strpos($num, $item) === 0) {
            $carrier = "VINAPHONE";
        }
    }

    foreach ($mobiPrefix as $item) {
        if (strpos($num, $item) === 0) {
            $carrier = "MOBIFONE";
        }
    }

    foreach ($vietnammobilePrefix as $item) {
        if (strpos($num, $item) === 0) {
            $carrier = "VIETNAMMOBILE";
        }
    }

    foreach ($gmobilePrefix as $item) {
        if (strpos($num, $item) === 0) {
            $carrier = "GMOBILE";
        }
    }

    if ($carrier == null) {
        return $carrier = "OTHER";
    }

    return $carrier;

}

function sendRequest($url, $params = array(), $proxy_link='', $proxy_port='', $header_key='', $method = 'POST', $isJSON = true, $isAuthen = false, $timeOut = 600)
{   
    $request = \Ixudra\Curl\Facades\Curl::to($url)
        ->withOption('TIMEOUT', $timeOut)
        ->withOption('CONNECTTIMEOUT', 0)
        ->withOption('SSL_VERIFYPEER', 0)
        ->withContentType('application/json')
        ->withOption('FOLLOWLOCATION', true)
        ->returnResponseObject();
    if($proxy_link !=''){
        $request->withProxy($proxy_link,$proxy_port);
    }

    if ($header_key) {
        $request->withHeaders(['Authorization' => "Bearer {$header_key}"]);
    }
    if ($isJSON) {
        if(count($params)){
            $request->withData(json_encode($params));
        }
    } else {
        $request->withData($params);
    }

    if ($isAuthen) {
        $request->withOption('USERPWD', 'admin:weppoHER4352GGErfg');
    }

    $response = '';
    switch ($method) {
        case 'GET':
            $response = $request->get();
            break;
        case 'POST':
            $response = $request->post();
            break;
        case 'PUT':
            $response = $request->put();
            break;
        case 'PATCH':
            $response = $request->patch();
            break;
        case 'DELETE':
            $response = $request->delete();
            break;
        default:
            break;
    }
    return $response->content;
}

if (!function_exists('user_logged_in')) {
    function user_logged_in()
    {
        $userRepository = app(UserRepository::class);
        $session = session('user_logged_in');
        $email = $session['email'];

        return $userRepository->where('email', $email)->first();
    }
}
