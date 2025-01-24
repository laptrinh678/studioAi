// eslint-disable-next-line no-control-regex
import i18n from "../lang/i18n"
const colors = {
	DARKBLUE: '#36b3d0',
	ORANGE: '#f87979',
	DEEP_LIGHTEN_2: '#4472C4',
	BLUE_LIGHTEN_2: '#64B5F6',
	PURPLE_LIGHTEN_2: '#BA68C8',
	ORANGE_LIGHTEN_2: '#FFB74D',
	DEEP_ORANGE_LIGHTEN_1: '#ED7D31',
	DEEP_ORANGE_LIGHTEN_2: '#FF8A65',
	CADMIUM_ORANGE: '#ED7D31',
	QUICK_SILVER: '#A1A1A1',
	AMBER: '#FFBF00',
	GRAY: '#7D7D7D',
};

const UNIT_MILLISECONDS = 1000;
const ONE_MINUTE = 60000;
const FORMAT_DATE = {
	FULL_DATE_TIME: 'YYYY/MM/DD hh:mm:ss A',
};

const colorsChart = [
	{ r: 205, g: 133, b: 63 },
	{ r: 151, g: 255, b: 255 },
	{ r: 198, g: 226, b: 255 },
	{ r: 106, g: 90, b: 205 },
	{ r: 255, g: 106, b: 106 },
	{ r: 139, g: 101, b: 8 },
	{ r: 255, g: 185, b: 15 },
	{ r: 0, g: 205, b: 0 },
	{ r: 255, g: 105, b: 180 },
	{ r: 0, g: 0, b: 139 },
	{ r: 224, g: 102, b: 255 },
	{ r: 0, g: 128, b: 128 },
	{ r: 255, g: 225, b: 255 },
	{ r: 139, g: 28, b: 98 },
	{ r: 255, g: 69, b: 0 },
	{ r: 176, g: 224, b: 230 },
	{ r: 255, g: 215, b: 0 },
	{ r: 255, g: 181, b: 197 },
	{ r: 32, g: 178, b: 170 },
	{ r: 255, g: 246, b: 143 },
];

const errors = {
	NORMAL: 0,
	EMPTY: 1,
	OTHER: 2,
};

const imageNumber = [
	{
		label: '1',
		value: 1
	},
	{
		label: '2',
		value: 2
	},
	{
		label: '4',
		value: 4
	}
]

const oneImageOption = [
	{
		label: '1',
		value: 1
	}
]

const twoImageOption = [
	...oneImageOption,
	{
		label: '2',
		value: 2
	}
]

const diversity = [
	{
		label: i18n.global.t('common.form_config.seed_option[0]'),
		value: 42
	},
	{
		label: i18n.global.t('common.form_config.seed_option[1]'),
		value: -1
	}
]

const guidanceScale = [
	{
		label: i18n.global.t('common.form_config.guidance_scale_option[0]'),
		value: '3.0'
	},
	{
		label: i18n.global.t('common.form_config.guidance_scale_option[1]'),
		value: '7.0'
	},
	{
		label: i18n.global.t('common.form_config.guidance_scale_option[2]'),
		value: '13.0'
	}
]

const imageSize = [
	{
		label: '1024x1024',
		value: '1024x1024'
	},
	{
		label: '1280x720',
		value: '1280x720'
	},
	{
		label: '720x1280',
		value: '720x1280'
	},
	{
		label: '1080x1920',
		value: '1080x1920'
	},
	{
		label: '1920x1080',
		value: '1920x1080'
	}
]

const imageNumberBySize = {
	'1024x1024': twoImageOption,
	'1280x720': twoImageOption,
	'720x1280': twoImageOption,
	'1080x1920': oneImageOption,
	'1920x1080': oneImageOption
}

const defaultOption = {
	label: i18n.global.t('common.form_config.prompt_style_option[0]'),
	value: "none"
}

const strengthOption = [
	{
		label: 'Tương tự',
		value: '0'
	},
	{
		label: 'Tương đối',
		value: '0.3'
	},
	{
		label: 'Tương đối khác',
		value: '0.7'
	},
	{
		label: 'Không phụ thuộc ảnh',
		value: '1.0'
	},
]

const optionsScale = [
	{
		label: '1.0',
		value: '1.0'
	},
	{
		label: '2.0',
		value: '2.0'
	},
	{
		label: '3.0',
		value: '3.0'
	},
	{
		label: '4.0',
		value: '4.0'
	},
	{
		label: '5.0',
		value: '5.0'
	},
]

const optionTypePrompt = [
	{
		label: i18n.global.t('common.form_config.prompt_style_option[0]'),
		value: 'none'
	},
	{
		label: i18n.global.t('common.form_config.prompt_style_option[1]'),
		value: 'The photo is anime style'
	},
	{
		label: i18n.global.t('common.form_config.prompt_style_option[2]'),
		value: 'The photo is cartoon style'
	},
	{
		label: i18n.global.t('common.form_config.prompt_style_option[3]'),
		value: 'The photo is photorealistic style'
	},
	{
		label: i18n.global.t('common.form_config.prompt_style_option[4]'),
		value: 'The photo is landscape style'
	},
	{
		label: i18n.global.t('common.form_config.prompt_style_option[5]'),
		value: 'The photo is fantasy style'
	},
	{
		label: i18n.global.t('common.form_config.prompt_style_option[6]'),
		value: 'The photo is artistic style'
	},
	{
		label: i18n.global.t('common.form_config.prompt_style_option[7]'),
		value: 'The photo is monochromatic style'
	},

]

const optionLora = [
    {
        label: "Mặc định",
        value: "none",
        // "instance_prompt": "extremely detailed"
    },
    {
        label: "Ảnh Chi tiết",
        value: "extremely detailed",
        // "instance_prompt": "extremely detailed"
    },
    {
        label: "Chữ hiệu ứng",
        value: "pixel-art-xl",
        // "instance_prompt": "pixel art"
    },
    {
        label: "Thêm chi tiết",
        value: "add-detail-xl",
        // "instance_prompt": ""
    },
    {
        label: "Thô",
        value: "raw",
        // "instance_prompt": "extremely detailed"
    },
    {
        label: "Logo",
        value: "LogoRedmondV2-Logo-LogoRedmAF",
        // "instance_prompt": "LogoRedAF"
    }
]

const controlModeOption = [
	{
		label: i18n.global.t('common.form_config.control_mode_option[0]'),
		value: 0
	},
	// {
	// 	label: i18n.global.t('common.form_config.control_mode_option[2]'),
	// 	value: 2
	// },
	{
		label: i18n.global.t('common.form_config.control_mode_option[4]'),
		value: 4
	},
	{
		label: i18n.global.t('common.form_config.control_mode_option[6]'),
		value: 6
	},
	{
		label: i18n.global.t('common.form_config.control_mode_option[1]'),
		value: 1
	},
	{
		label: i18n.global.t('common.form_config.control_mode_option[3]'),
		value: 3
	},
	{
		label: i18n.global.t('common.form_config.control_mode_option[5]'),
		value: 5
	},
]
export {
	colors,
	UNIT_MILLISECONDS,
	FORMAT_DATE,
	colorsChart,
	ONE_MINUTE,
	errors,
	imageNumber,
	diversity,
	guidanceScale,
	imageSize,
	defaultOption,
	strengthOption,
	optionsScale,
	optionTypePrompt,
	optionLora,
	oneImageOption,
	twoImageOption,
	imageNumberBySize,
	controlModeOption
};

