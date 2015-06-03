
var languageModule = (function() {


	var langCookieName = 'langCookieName',
		 langCookieOptions = {expires: 7, path: '/'},
		 langVariable = {
			'.main-title': {
				rus: "Генератор водяных знаков",
				eng: "Watermark generator"
			},
			'.footer-copi': {
				rus: "© 2015, Это мой сайт, пожалуйста, не копируйте и не воруйте его",
				eng: "© 2015 This is my website, please do not copy or steal it"
			},
			'.controls-title': {
				rus: "Настройки",
				eng: "Settings"
			},
			'.original-image': {
				rus: "Исходное изображение",
				eng: "Original image"
			},
			'.watermark-image': {
				rus: "Водяной знак",
				eng: "Watermark"
			},
			'.place-title': {
				rus: "Положение",
				eng: "Place"
			},
			'.transparency-title': {
				rus: "Прозрачность",
				eng: "Transparency"
			},
			'.btn__clear': {
				rus: "Сброс",
				eng: "Reset"
			},
			'.btn__save': {
				rus: "Скачать",
				eng: "Download"
			},
			'.watermark-work': {
				rus: "watermark-work-rus",
				eng: "watermark-work-eng"
			}
		},
		language = $.cookie(langCookieName);
		// по умолчанию Русский язык
        if (!language){
            language = 'rus';
            $.cookie(langCookieName, language, { expires: 7 });
            setLang(language);
        }
        else{
            $.cookie('name');
            setLang(language);
        }

	function addEventListeners() {
		$('.lang__link').on('click', onSwitchLang);
	}

	function onSwitchLang(e) {
		var	language = $(this).attr('class').substr(-3);

		e.preventDefault();
        if($(this).hasClass('lang__link__active')) {
        	return;
        }
		setLang(language);
	}
	
   function setLang(language) {
        $.cookie(langCookieName, language, langCookieOptions);
		currentLang = language;

		for (var selector in langVariable) {
			if (selector.substr(0, 15) === '.watermark-work') {
				$(selector).attr('data-bg', langVariable[selector][language]);
				continue;
			}
			$(selector).text(langVariable[selector][language]);
		}
		$('.lang__link').removeClass('lang__link__active');
      	$('.lang__link__' + currentLang).addClass('lang__link__active');
	}

	return {
		init: function() {
			addEventListeners();
		}
	}

}());
