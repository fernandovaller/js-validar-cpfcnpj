function sanitize (value) {
	return value.replace(/\W/g, '');
};

function addAlert(el, msg) {
	var input = $(el);
	msg = msg !== 'undefined' ? msg : 'Inválido';
	var group = $(input).parent();
	if (input) {
		group.addClass('has-error');
		if (!group.find('span').hasClass('help-block')) {
			group.append('<span class="help-block">' + msg + '</span>');
		} else {
			group.find('.help-block').fadeOut().fadeIn(1000);
		}
	}
}

function addAlertIcon(el, msg) {
	var input = $(el);
	msg = msg !== 'undefined' ? msg : 'Inválido';
	var group = $(input).parent();
	if (input) {
		group.addClass('has-error');
		group.addClass('has-feedback');
		if (!group.find('span').hasClass('help-block')) {
			group.append('<span class="help-block">' + msg + '</span>');
			group.append('<span class="form-control-feedback glyphicon glyphicon-remove"></span>');
		} else {
			group.find('.help-block').fadeOut().fadeIn(1000);
		}
	}
}

function removeAlert(el) {
	var input = $(el);
	if (input) {
		$(input).parent().removeClass('has-error').find('.help-block').remove().fadeOut();
	}
}

function removeAlertIcon(el) {
	var input = $(el);
	if (input) {
		$(input).parent().removeClass('has-error').find('.help-block').remove().fadeOut();			
		$(input).parent().removeClass('has-feedback').find('.form-control-feedback').remove().fadeOut();
	}
}

function checkCPF(cpf) {
	var cpf = sanitize(cpf);

	if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" ||
		cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" ||
		cpf == "55555555555" || cpf == "66666666666" || cpf == "77777777777" ||
		cpf == "88888888888" || cpf == "99999999999") {
		return false;
	}

	soma = 0;
	for (i = 0; i < 9; i++)
		soma += parseInt(cpf.charAt(i)) * (10 - i);
	resto = 11 - (soma % 11);
	if (resto == 10 || resto == 11)
		resto = 0;
	if (resto != parseInt(cpf.charAt(9))) {
		return false;
	}
	soma = 0;
	for (i = 0; i < 10; i++)
		soma += parseInt(cpf.charAt(i)) * (11 - i);
	resto = 11 - (soma % 11);
	if (resto == 10 || resto == 11)
		resto = 0;
	if (resto != parseInt(cpf.charAt(10))) {
		return false;
	}
	return true;
}

function checkCNPJ(cnpj) {
	CNPJ = sanitize(cnpj);
	var a = [];
	var b = new Number;
	var c = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
	for (i = 0; i < 12; i++) {
		a[i] = CNPJ.charAt(i);
		b += a[i] * c[i + 1];
	}
	if ((x = b % 11) < 2) {
		a[12] = 0
	} else {
		a[12] = 11 - x
	}
	b = 0;
	for (y = 0; y < 13; y++) {
		b += (a[y] * c[y]);
	}
	if ((x = b % 11) < 2) {
		a[13] = 0;
	} else {
		a[13] = 11 - x;
	}
	if ((CNPJ.charAt(12) != a[12]) || (CNPJ.charAt(13) != a[13])) {
		return false;
	}
	return true;
}

if ($(".vcpf").has()) {
	$(".vcpf").blur(function() {
		var cpf = $('.vcpf').val();
		var msg = $('.vcpf').data('msg');
		if (cpf != '') {
			if (!checkCPF(cpf)) {
				addAlertIcon('.vcpf', msg);
				//addAlert('.vcpf', msg);
			} else {
				removeAlertIcon('.vcpf');
				///removeAlert('.vcpf');
			}
		}
	});
}

if ($(".vcnpj").has()) {
	$(".vcnpj").blur(function() {
		var cnpj = $('.vcnpj').val();
		var msg = $('.vcnpj').data('msg');
		if (cnpj != '') {
			if (!checkCNPJ(cnpj)) {
				addAlertIcon('.vcnpj', msg);
				//addAlert('.vcnpj', msg);
			} else {
				removeAlertIcon('.vcnpj');
				//removeAlert('.vcnpj');
			}

		}

	});
}
