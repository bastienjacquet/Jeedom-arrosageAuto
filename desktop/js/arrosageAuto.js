$("#table_cmd").sortable({axis: "y", cursor: "move", items: ".cmd", placeholder: "ui-state-highlight", tolerance: "intersect", forcePlaceholderSize: true});
$("#table_Prorgamationtab").sortable({axis: "y", cursor: "move", items: ".ProgramationGroup", placeholder: "ui-state-highlight", tolerance: "intersect", forcePlaceholderSize: true});
$("#table_condition").sortable({axis: "y", cursor: "move", items: ".ConditionGroup", placeholder: "ui-state-highlight", tolerance: "intersect", forcePlaceholderSize: true});
$("#table_action").sortable({axis: "y", cursor: "move", items: ".ActionGroup", placeholder: "ui-state-highlight", tolerance: "intersect", forcePlaceholderSize: true});
$('.bt_showExpressionTest').off('click').on('click', function () {
  $('#md_modal').dialog({title: "{{Testeur d'expression}}"});
  $("#md_modal").load('index.php?v=d&modal=expression.test').dialog('open');
});
$('body').on('click','.eqLogicAttr[data-l1key=configuration][data-l2key=TypeGicler]',function(){
	var div=$(this).closest('fieldset').find('.TypeCalcul');
	div.html('');
	switch($(this).val()){
		case 'gouteAgoute':
			div.append($('<div class="form-group">')
				.append($('<label class="col-sm-2 control-label" >')
					.text('{{Débit du goutteur (l/h)}}')
					.append($('<sup>')
						.append($('<i class="fa fa-question-circle tooltips" title="Saisir le Débit du goutteur (l/h)" style="font-size : 1em;color:grey;">'))))
				.append($('<div class="col-sm-5">')
					.append($('<input class="eqLogicAttr form-control" data-l1key="configuration" data-l2key="DebitGoutteur" />'))));
			div.append($('<div class="form-group">')
				.append($('<label class="col-sm-2 control-label" >')
					.text('{{Espacement latéral (cm)}}')
					.append($('<sup>')
						.append($('<i class="fa fa-question-circle tooltips" title="Saisir l\'espacement latéral (cm)" style="font-size : 1em;color:grey;">'))))
				.append($('<div class="col-sm-5">')
					.append($('<input class="eqLogicAttr form-control" data-l1key="configuration" data-l2key="EspacementLateral" />'))));
			div.append($('<div class="form-group">')
				.append($('<label class="col-sm-2 control-label" >')
					.text('{{Espacement des goutteurs (cm)}}')
					.append($('<sup>')
						.append($('<i class="fa fa-question-circle tooltips" title="Saisir l\'espacement des goutteurs (cm)" style="font-size : 1em;color:grey;">'))))
				.append($('<div class="col-sm-5">')
					.append($('<input class="eqLogicAttr form-control" data-l1key="configuration" data-l2key="EspacemenGoutteurs" />'))));
		break;
	 }
});
function saveEqLogic(_eqLogic) {
	_eqLogic.configuration.programation=new Object();
	_eqLogic.configuration.condition=new Object();
	_eqLogic.configuration.action=new Object();
	var ConditionArray= new Array();
	var ActionArray= new Array();
	var ProgramationArray= new Array();
	$('#conditiontab .ConditionGroup').each(function( index ) {
		ConditionArray.push($(this).getValues('.expressionAttr')[0])
	});
	$('#programationtab .ProgramationGroup').each(function( index ) {
		ProgramationArray.push($(this).getValues('.expressionAttr')[0])
	});

	$('#actiontab .ActionGroup').each(function( index ) {
		ActionArray.push($(this).getValues('.expressionAttr')[0])
	});
	_eqLogic.configuration.condition=ConditionArray;
	_eqLogic.configuration.programation=ProgramationArray;
	_eqLogic.configuration.action=ActionArray;
   	return _eqLogic;
}
function printEqLogic(_eqLogic) {
	$('.ConditionGroup').remove();
	$('.ProgramationGroup').remove();
	$('.ActionGroup').remove();
	if (typeof(_eqLogic.configuration.condition) !== 'undefined') {
		for(var index in _eqLogic.configuration.condition) {
			if( (typeof _eqLogic.configuration.condition[index] === "object") && (_eqLogic.configuration.condition[index] !== null) )
				addCondition(_eqLogic.configuration.condition[index],$('#conditiontab').find('table tbody'));
		}
	}
	if (typeof(_eqLogic.configuration.programation) !== 'undefined') {
		for(var index in _eqLogic.configuration.programation) {
			if( (typeof _eqLogic.configuration.programation[index] === "object") && (_eqLogic.configuration.programation[index] !== null) )
				addProgramation(_eqLogic.configuration.programation[index],$('#programationtab').find('table tbody'));
		}
	}
	if (typeof(_eqLogic.configuration.action) !== 'undefined') {
		for(var index in _eqLogic.configuration.action) {
			if( (typeof _eqLogic.configuration.action[index] === "object") && (_eqLogic.configuration.action[index] !== null) )
				addAction(_eqLogic.configuration.action[index],$('#actiontab').find('table tbody'));
		}
	}
}
function addProgramation(_programation,  _el) {
	var Heure=$('<select class="expressionAttr form-control" data-l1key="Heure" >');
    var Minute=$('<select class="expressionAttr form-control" data-l1key="Minute" >');
	var number = 0;
    while (number < 24) {
		Heure.append($('<option value="'+number+'">')
			.text(number));
    	number++;
	}
  	number = 0;
    while (number < 60) {
		Minute.append($('<option value="'+number+'">')
			.text(number));
    	number++;
	}
	var tr = $('<tr class="ProgramationGroup">')
		.append($('<td>')
			.append($('<span class="input-group-btn">')
				.append($('<a class="btn btn-default ProgramationAttr btn-sm" data-action="remove">')
					.append($('<i class="fa fa-minus-circle">')))))
		.append($('<td>')
			.append($('<label class="checkbox-inline">')
				.append($('<input type="checkbox" class="expressionAttr" data-l1key="1">'))
				.append('{{Lundi}}'))
			.append($('<label class="checkbox-inline">')
				.append($('<input type="checkbox" class="expressionAttr" data-l1key="2">'))
				.append('{{Mardi}}'))
			.append($('<label class="checkbox-inline">')
				.append($('<input type="checkbox" class="expressionAttr" data-l1key="3">'))
				.append('{{Mercredi}}'))
			.append($('<label class="checkbox-inline">')
				.append($('<input type="checkbox" class="expressionAttr" data-l1key="4">'))
				.append('{{Jeudi}}'))
			.append($('<label class="checkbox-inline">')
				.append($('<input type="checkbox" class="expressionAttr" data-l1key="5">'))
				.append('{{Vendredi}}'))
			.append($('<label class="checkbox-inline">')
				.append($('<input type="checkbox" class="expressionAttr" data-l1key="6">'))
				.append('{{Samedi}}'))
			.append($('<label class="checkbox-inline">')
				.append($('<input type="checkbox" class="expressionAttr" data-l1key="0" />'))
				.append('{{Dimanche}}')))
		.append($('<td>')
			.append(Heure)
			.append(Minute));
        _el.append(tr);
        _el.find('tr:last').setValues(_programation, '.expressionAttr');
	$('.ProgramationAttr[data-action=remove]').off().on('click',function(){
		$(this).closest('tr').remove();
	});
}
function addCondition(_condition,_el) {
	var tr = $('<tr class="ConditionGroup">')
		.append($('<td>')
			.append($('<input type="checkbox" class="expressionAttr" data-l1key="enable" checked/>')))
		.append($('<td>')
			.append($('<div class="input-group">')
				.append($('<span class="input-group-btn">')
					.append($('<a class="btn btn-default conditionAttr btn-sm" data-action="remove">')
						.append($('<i class="fa fa-minus-circle">'))))
				.append($('<input class="expressionAttr form-control input-sm cmdCondition" data-l1key="expression"/>'))
				.append($('<span class="input-group-btn">')
					.append($('<a class="btn btn-warning btn-sm listCmdCondition">')
						.append($('<i class="fa fa-list-alt">'))))));

        _el.append(tr);
        _el.find('tr:last').setValues(_condition, '.expressionAttr');
	$('.conditionAttr[data-action=remove]').off().on('click',function(){
		$(this).closest('tr').remove();
	});  
}
function addAction(_action,  _el) {
	var tr = $('<tr class="ActionGroup">')
		.append($('<td>')
			.append($('<input type="checkbox" class="expressionAttr" data-l1key="enable"/>')))
		.append($('<td>')
			.append($('<div class="input-group">')
				.append($('<span class="input-group-btn">')
					.append($('<a class="btn btn-default ActionAttr btn-sm" data-action="remove">')
						.append($('<i class="fa fa-minus-circle">'))))
				.append($('<input class="expressionAttr form-control input-sm cmdAction" data-l1key="cmd"/>'))
				.append($('<span class="input-group-btn">')
					.append($('<a class="btn btn-success btn-sm listAction" title="Sélectionner un mot-clé">')
						.append($('<i class="fa fa-tasks">')))
					.append($('<a class="btn btn-success btn-sm listCmdAction">')
						.append($('<i class="fa fa-list-alt">'))))))
		.append($('<td>')
		       .append($(jeedom.cmd.displayActionOption(init(_action.cmd, ''), _action.options))))
		.append($('<td>')
			.append($('<select class="expressionAttr form-control" data-l1key="Type">')
				.append($('<option value="">')
					.text('{{Tous}}'))
				.append($('<option value="start">')
					.text('{{Start}}'))
				.append($('<option value="stop">')
					.text('{{Stop}}'))));
        _el.append(tr);
        _el.find('tr:last').setValues(_action, '.expressionAttr');
	$('.ActionAttr[data-action=remove]').off().on('click',function(){
		$(this).closest('tr').remove();
	});
 }
$('.ProgramationAttr[data-action=add]').off().on('click',function(){
	addProgramation({},$(this).closest('.tab-pane').find('table'));
});
$('.conditionAttr[data-action=add]').off().on('click',function(){
	addCondition({},$(this).closest('.tab-pane').find('table'));
});
$('body').on('click','.listCmdCondition',function(){
	var el = $(this).closest('tr').find('.expressionAttr[data-l1key=expression]');
	jeedom.cmd.getSelectModal({cmd: {type: 'info'}}, function (result) {
		var message = 'Aucun choix possible';
		if(result.cmd.subType == 'numeric'){
			message = '<div class="row">  ' +
			'<div class="col-md-12"> ' +
			'<form class="form-horizontal" onsubmit="return false;"> ' +
			'<div class="form-group"> ' +
			'<label class="col-xs-5 control-label" >'+result.human+' {{est}}</label>' +
			'             <div class="col-xs-3">' +
			'                <select class="conditionAttr form-control" data-l1key="operator">' +
			'                    <option value="==">{{égal}}</option>' +
			'                  <option value=">">{{supérieur}}</option>' +
			'                  <option value="<">{{inférieur}}</option>' +
			'                 <option value="!=">{{différent}}</option>' +
			'            </select>' +
			'       </div>' +
			'      <div class="col-xs-4">' +
			'         <input type="number" class="conditionAttr form-control" data-l1key="operande" />' +
			'    </div>' +
			'</div>' +
			'<div class="form-group"> ' +
			'<label class="col-xs-5 control-label" >{{Ensuite}}</label>' +
			'             <div class="col-xs-3">' +
			'                <select class="conditionAttr form-control" data-l1key="next">' +
			'                    <option value="">rien</option>' +
			'                  <option value="OU">{{ou}}</option>' +
			'            </select>' +
			'       </div>' +
			'</div>' +
			'</div> </div>' +
			'</form> </div>  </div>';
		}
		if(result.cmd.subType == 'string'){
			message = '<div class="row">  ' +
			'<div class="col-md-12"> ' +
			'<form class="form-horizontal" onsubmit="return false;"> ' +
			'<div class="form-group"> ' +
			'<label class="col-xs-5 control-label" >'+result.human+' {{est}}</label>' +
			'             <div class="col-xs-3">' +
			'                <select class="conditionAttr form-control" data-l1key="operator">' +
			'                    <option value="==">{{égale}}</option>' +
			'                  <option value="matches">{{contient}}</option>' +
			'                 <option value="!=">{{différent}}</option>' +
			'            </select>' +
			'       </div>' +
			'      <div class="col-xs-4">' +
			'         <input class="conditionAttr form-control" data-l1key="operande" />' +
			'    </div>' +
			'</div>' +
			'<div class="form-group"> ' +
			'<label class="col-xs-5 control-label" >{{Ensuite}}</label>' +
			'             <div class="col-xs-3">' +
			'                <select class="conditionAttr form-control" data-l1key="next">' +
			'                    <option value="">{{rien}}</option>' +
			'                  <option value="OU">{{ou}}</option>' +
			'            </select>' +
			'       </div>' +
			'</div>' +
			'</div> </div>' +
			'</form> </div>  </div>';
		}
		if(result.cmd.subType == 'binary'){
			message = '<div class="row">  ' +
			'<div class="col-md-12"> ' +
			'<form class="form-horizontal" onsubmit="return false;"> ' +
			'<div class="form-group"> ' +
			'<label class="col-xs-5 control-label" >'+result.human+' {{est}}</label>' +
			'            <div class="col-xs-7">' +
			'                 <input class="conditionAttr" data-l1key="operator" value="==" style="display : none;" />' +
			'                  <select class="conditionAttr form-control" data-l1key="operande">' +
			'                       <option value="1">{{Ouvert}}</option>' +
			'                       <option value="0">{{Fermé}}</option>' +
			'                       <option value="1">{{Allumé}}</option>' +
			'                       <option value="0">{{Éteint}}</option>' +
			'                       <option value="1">{{Déclenché}}</option>' +
			'                       <option value="0">{{Au repos}}</option>' +
			'                       </select>' +
			'                    </div>' +
			'                 </div>' +
			'<div class="form-group"> ' +
			'<label class="col-xs-5 control-label" >{{Ensuite}}</label>' +
			'             <div class="col-xs-3">' +
			'                <select class="conditionAttr form-control" data-l1key="next">' +
			'                  <option value="">{{rien}}</option>' +
			'                  <option value="OU">{{ou}}</option>' +
			'            </select>' +
			'       </div>' +
			'</div>' +
			'</div> </div>' +
			'</form> </div>  </div>';
		}

		bootbox.dialog({
			title: "{{Ajout d'une nouvelle condition}}",
			message: message,
			buttons: {
				"Ne rien mettre": {
					className: "btn-default",
					callback: function () {
						el.atCaret('insert', result.human);
					}
				},
				success: {
					label: "Valider",
					className: "btn-primary",
					callback: function () {
    						var condition = result.human;
						condition += ' ' + $('.conditionAttr[data-l1key=operator]').value();
						if(result.cmd.subType == 'string'){
							if($('.conditionAttr[data-l1key=operator]').value() == 'matches'){
								condition += ' "/' + $('.conditionAttr[data-l1key=operande]').value()+'/"';
							}else{
								condition += ' "' + $('.conditionAttr[data-l1key=operande]').value()+'"';
							}
						}else{
							condition += ' ' + $('.conditionAttr[data-l1key=operande]').value();
						}
						condition += ' ' + $('.conditionAttr[data-l1key=next]').value()+' ';
						el.atCaret('insert', condition);
						if($('.conditionAttr[data-l1key=next]').value() != ''){
							el.click();
						}
					}
				},
			}
		});
	});
});
$('.ActionAttr[data-action=add]').off().on('click',function(){
	addAction({},$(this).closest('.tab-pane').find('table'));
});
$("body").on('click', ".listAction", function() {
	var el = $(this).closest('.form-group').find('.expressionAttr[data-l1key=cmd]');
	jeedom.getSelectActionModal({}, function (result) {
		el.value(result.human);
		jeedom.cmd.displayActionOption(el.value(), '', function (html) {
			el.closest('.form-group').find('.actionOptions').html(html);
		});
	});
});
$("body").on('click', ".listCmdAction", function() {
	var el = $(this).closest('td').find('.expressionAttr[data-l1key=cmd]');
	jeedom.cmd.getSelectModal({cmd: {type: 'action'}}, function (result) {
		el.value(result.human);
		jeedom.cmd.displayActionOption(el.value(), '', function (html) {
			el.closest('.form-group').find('.actionOptions').html(html);
		});
	});
});
function addCmdToTable(_cmd) {
	var tr =$('<tr class="cmd" data-cmd_id="' + init(_cmd.id) + '">');
	tr.append($('<td>')
		.append($('<input type="hidden" class="cmdAttr form-control input-sm" data-l1key="id">'))
		.append($('<input class="cmdAttr form-control input-sm" data-l1key="name" value="' + init(_cmd.name) + '" placeholder="{{Name}}" title="Name">')));
	var parmetre=$('<td>');
	parmetre.append($('<span class="type" type="' + init(_cmd.type) + '">')
			.append(jeedom.cmd.availableType()));
	parmetre.append($('<span class="subType" subType="'+init(_cmd.subType)+'">'));
	if (is_numeric(_cmd.id)) {
		parmetre.append($('<a class="btn btn-default btn-xs cmdAction" data-action="test">')
			.append($('<i class="fa fa-rss">')
				.text('{{Tester}}')));
	}
	parmetre.append($('<a class="btn btn-default btn-xs cmdAction tooltips" data-action="configure">')
		.append($('<i class="fa fa-cogs">')));
	parmetre.append($('<div>')
		.append($('<span>')
			.append($('<label class="checkbox-inline">')
				.append($('<input type="checkbox" class="cmdAttr checkbox-inline" data-size="mini" data-label-text="{{Historiser}}" data-l1key="isHistorized" checked/>'))
				.append('{{Historiser}}')
				.append($('<sup>')
					.append($('<i class="fa fa-question-circle tooltips" style="font-size : 1em;color:grey;">')
					.attr('title','Souhaitez-vous historiser les changements de valeur ?'))))));
	parmetre.append($('<div>')
		.append($('<span>')
			.append($('<label class="checkbox-inline">')
				.append($('<input type="checkbox" class="cmdAttr checkbox-inline" data-size="mini" data-label-text="{{Afficher}}" data-l1key="isVisible" checked/>'))
				.append('{{Afficher}}')
				.append($('<sup>')
					.append($('<i class="fa fa-question-circle tooltips" style="font-size : 1em;color:grey;">')
					.attr('title','Souhaitez-vous afficher cette commande sur le dashboard ?'))))));
	tr.append(parmetre);
	$('#table_cmd tbody').append(tr);
	$('#table_cmd tbody tr:last').setValues(_cmd, '.cmdAttr');
	jeedom.cmd.changeType($('#table_cmd tbody tr:last'), init(_cmd.subType));
}
