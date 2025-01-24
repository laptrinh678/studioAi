// import colorVariable from "../../sass/_variables.scss";

export default [
    {
        value: 'red',
        color: '#EE0033',
        description: 'Vị trí cấu hình đèn đỏ',
        type: 'Rectangle'
    },
    {
        value: 'yellow',
        color: '#FFFF00',
        description: 'Vị trí cấu hình đèn vàng',
        type: 'Rectangle'
    },
    {
        value: 'green',
        color: '#6FCF97',
        description: 'Vị trí cấu hình đèn xanh',
        type: 'Rectangle'
    },
    {
        value: 'detect_plate_area',
        color: '#F2994A',
        description: 'Vùng phát hiện biển số',
        type: 'Polygon'
    },
    {
        value: 'counting_area',
        color: '#B5B4B4',
        description: 'Vùng đo đếm',
        type: 'Polygon'
    },
    {
        value: 'red_line',
        color: '#F78787',
        description: 'Vạch vượt đèn đỏ',
        type: 'Line'
    },
    {
        value: 'straight_violation_line',
        color: '#34bfa3',
        description: 'Hướng xác định xe đi thẳng',
        type: 'Polygon'
    },
    {
        value: 'left_violation_line',
        color: '#409eff',
        description: 'Hướng xác định xe rẽ trái',
        type: 'Polygon'
    },
    {
        value: 'right_violation_line',
        color: '#E6A23C',
        description: 'Hướng xác định xe rẽ phải',
        type: 'Polygon'
    },
    {
        value: 'straight_lane',
        color: '#A39D2E',
        description: 'Lane đi thẳng',
        type: 'Polygon'
    },
    {
        value: 'left_lane',
        color: '#E0E0E0',
        description: 'Lane rẽ trái',
        type: 'Polygon'
    },
    {
        value: 'right_lane',
        color: '#828282',
        description: ' Lane rẽ phải',
        type: 'Polygon'
    },
    {
        value: 'straight_left_lane',
        color: '#800080',
        description: 'Lane đi thẳng rẽ trái',
        type: 'Polygon'
    },
    {
        value: 'straight_right_lane',
        color: '#642b64',
        description: 'Lane đi thẳng rẽ phải',
        type: 'Polygon'
    },
    {
        value: 'side_walk',
        color: '#E361E3',
        description: 'Vùng không phát hiện phương tiện',
        type: 'Polygon'
    },
    {
        value: 'lane_direction',
        color: '#0d6efd',
        description: 'Chiều của lane',
        type: 'Line'
    },
    {
        value: 'stop_area',
        color: '#4F4F4F',
        description: 'Vùng cấm dừng đỗ',
        type: 'Polygon'
    },
    {
        value: 'long_stop',
        color: '#f56C6C',
        description: 'Thời gian cho phép dừng đỗ',
        type: 'Polygon'
    },
    {
        value: 'over_line',
        color: '#67C23A',
        description: 'Phát hiện đè vạch',
        type: 'Polygon'
    },
]