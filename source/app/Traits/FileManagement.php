<?php

namespace App\Traits;

use Aws\S3\S3Client;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use League\Flysystem\FilesystemException;

trait FileManagement
{
    /**
     * @throws FilesystemException
     * @throws Exception
     */
    public function uploadFile($file, $extension): string
    {
        try {
            $s3 = new S3Client([
                'version' => 'latest',
                'region'  => config('filesystems.disks.s3.region'),
                'endpoint' => config('filesystems.disks.s3.endpoint'),
                'use_path_style_endpoint' => true,
                'credentials' => [
                    'key'    => config('filesystems.disks.s3.key'),
                    'secret' => config('filesystems.disks.s3.secret'),
                ],
            ]);

            $bucket = config('filesystems.disks.s3.bucket');
            $key = $file->getClientOriginalName();
            $filePath = public_path($key);
            file_put_contents($filePath, file_get_contents($file->getRealPath()));
            $path = sprintf('genvideo/%s/', Carbon::now()->format('Y/m/d'));

            // Upload data.
            $result = $s3->putObject([
                'Bucket' => $bucket,
                'Key'    => $path.uniqid() . '_' .$key,
                'SourceFile' => $filePath,
            ]);

            unlink($filePath);
            return $result['ObjectURL'] ?? '';
        } catch (Exception $e) {
            $this->writeErrorLog($e);
            throw new Exception($e->getMessage());
        }

//        Upload file to minio
//        try {
//            $name = sprintf('%s_%s_%s', Carbon::now()->format('dmY'), time(), $extension);
//            $fileContent = file_get_contents($file->getRealPath());
//            Storage::disk('minio')->write($name, $fileContent);
//
//            return sprintf('/%s/%s', config('app.minio_bucket'), $name);
//        } catch (Exception $e) {
//            $this->writeErrorLog($e);
//            throw new Exception($e->getMessage());
//        }
    }

    /**
     * @throws Exception
     */
    public function deleteImage($path): bool|string
    {
        try {
            $s3 = new S3Client([
                'version' => 'latest',
                'region'  => config('filesystems.disks.s3.region'),
                'endpoint' => config('filesystems.disks.s3.endpoint'),
                'use_path_style_endpoint' => true,
                'credentials' => [
                    'key'    => config('filesystems.disks.s3.key'),
                    'secret' => config('filesystems.disks.s3.secret'),
                ],
            ]);

            $s3->deleteObject([
                'Bucket' => config('filesystems.disks.s3.bucket'),
                'Key' => $path
            ]);

            return true;
        } catch (Exception $e) {
            $this->writeErrorLog($e);
            throw new Exception($e->getMessage());
        }

//        try {
//            Storage::disk('minio')->delete($path);
//
//            return true;
//        } catch (Exception $e) {
//            $this->writeErrorLog($e);
//            throw new Exception($e->getMessage());
//        }
    }

    public function writeErrorLog($exception): void
    {
        Log::error(sprintf('%s File: %s. Line: %s', $exception->getMessage(), $exception->getFile(), $exception->getLine()));
    }

    public function configCors(): void
    {
        $s3 = new S3Client([
            'version' => 'latest',
            'region'  => config('filesystems.disks.s3.region'),
            'endpoint' => config('filesystems.disks.s3.endpoint'),
            'use_path_style_endpoint' => true,
            'credentials' => [
                'key'    => config('filesystems.disks.s3.key'),
                'secret' => config('filesystems.disks.s3.secret'),
            ],
        ]);

        $cors = array(array(
            'AllowedOrigins' => array('*'),
            'AllowedMethods' => array('POST', 'GET', 'PUT'),
            'MaxAgeSeconds' => 3000,
            'AllowedHeaders' => array('*')
        ));

        $s3->putBucketCors([
            'Bucket' => config('filesystems.disks.s3.bucket'),
            'CORSConfiguration' => array('CORSRules' => $cors)
        ]);
    }
}