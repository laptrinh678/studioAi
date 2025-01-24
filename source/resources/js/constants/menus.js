export default [
    {
        title: "Dashboard",
        icon: "flaticon-dashboard",
        route: "/"
    },
    {
        title: "User",
        icon: "flaticon-dashboard",
        route: "/user"
    },
    {
        title: "Giám sát vi phạm",
        icon: "flaticon-photo-camera",
        children: [
            // {
            //     title: "Video",
            //     route: "/inspect/Stream"
            // },
            {
                title: "Khu vực 1",
                route: "/inspect/StreamKv1"
            },
            {
                title: "Khu vực 2",
                route: "/inspect/StreamKv2"
            },
            {
                title: "Khu vực 3",
                route: "/inspect/StreamKv3"
            },
            {
                title: "Khu vực 4",
                route: "/inspect/StreamKv4"
            },
            {
                title: "Video Vũng Tàu",
                route: "/inspect/StreamVungtau"
            },
            {
                title: "Video Gia Lai",
                route: "/inspect/StreamGiaLai"
            },
            {
                title: "Video POC",
                route: "/inspect/StreamPOC"
            }
        ]
    }
];
