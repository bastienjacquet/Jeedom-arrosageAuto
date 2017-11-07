<?php
if (!isConnect('admin')) {
throw new Exception('{{401 - Accès non autorisé}}');
}
sendVarToJS('eqType', 'arrosageAuto');
$eqLogics = eqLogic::byType('arrosageAuto');
?>
<div class="row row-overflow">
	<div class="col-lg-2">
		<div class="bs-sidebar">
			<ul id="ul_eqLogic" class="nav nav-list bs-sidenav">
				<a class="btn btn-default eqLogicAction" style="width : 50%;margin-top : 5px;margin-bottom: 5px;" data-action="add"><i class="fa fa-plus-circle"></i> {{Ajouter}}</a>
				<li class="filter" style="margin-bottom: 5px;"><input class="filter form-control input-sm" placeholder="{{Rechercher}}" style="width: 100%"/></li>
				<?php
					foreach ($eqLogics as $eqLogic)
						echo '<li class="cursor li_eqLogic" data-eqLogic_id="' . $eqLogic->getId() . '"><a>' . $eqLogic->getHumanName(true) . '</a></li>';
				?>
			</ul>
		</div>
	</div>
	<div class="col-lg-10 col-md-9 col-sm-8 eqLogicThumbnailDisplay" style="border-left: solid 1px #EEE; padding-left: 25px;">
		<legend>{{Mes Zones}}</legend>
		<div class="eqLogicThumbnailContainer">
			<div class="cursor eqLogicAction" data-action="add" style="background-color : #ffffff; height : 200px;margin-bottom : 10px;padding : 5px;border-radius: 2px;width : 160px;margin-left : 10px;" >
				<center>
					<i class="fa fa-plus-circle" style="font-size : 7em;color:#94ca02;"></i>
				</center>
				<span style="font-size : 1.1em;position:relative; top : 23px;word-break: break-all;white-space: pre-wrap;word-wrap: break-word;;color:#94ca02"><center>Ajouter</center></span>
			</div>
			<?php
				foreach ($eqLogics as $eqLogic) {
					$opacity = '';
					if ($eqLogic->getIsEnable() != 1) {
						$opacity = '
						-webkit-filter: grayscale(100%);
						-moz-filter: grayscale(100);
						-o-filter: grayscale(100%);
						-ms-filter: grayscale(100%);
						filter: grayscale(100%); opacity: 0.35;';
					}
					echo '<div class="eqLogicDisplayCard cursor" data-eqLogic_id="' . $eqLogic->getId() . '" style="background-color : #ffffff; height : 200px;margin-bottom : 10px;padding : 5px;border-radius: 2px;width : 160px;margin-left : 10px;' . $opacity . '" >';
					echo "<center>";
					echo '<img src="plugins/arrosageAuto/plugin_info/arrosageAuto_icon.png" height="105" width="95" />';
					echo "</center>";
					echo '<span style="font-size : 1.1em;position:relative; top : 15px;word-break: break-all;white-space: pre-wrap;word-wrap: break-word;"><center>' . $eqLogic->getHumanName(true, true) . '</center></span>';
					echo '</div>';
				}
			?>
		</div>
	</div>
	<div class="col-lg-10 col-md-9 col-sm-8 eqLogic" style="border-left: solid 1px #EEE; padding-left: 25px;display: none;">
		<a class="btn btn-success btn-sm eqLogicAction pull-right" data-action="save"><i class="fa fa-check-circle"></i> Sauvegarder</a>
		<a class="btn btn-danger btn-sm eqLogicAction pull-right" data-action="remove"><i class="fa fa-minus-circle"></i> Supprimer</a>
		<a class="btn btn-default btn-sm eqLogicAction pull-right" data-action="configure"><i class="fa fa-cogs"></i></a>
		<a class="btn btn-default btn-sm eqLogicAction pull-right expertModeVisible " data-action="copy"><i class="fa fa-copy"></i></a>
		<ul class="nav nav-tabs" role="tablist">
			<li role="presentation">
				<a href="#" class="eqLogicAction" aria-controls="home" role="tab" data-toggle="tab" data-action="returnToThumbnailDisplay">
					<i class="fa fa-arrow-circle-left"></i>
				</a>
			</li>
			<li role="presentation" class="active">
				<a href="#eqlogictab" aria-controls="home" role="tab" data-toggle="tab" aria-expanded="true">
					<i class="fa fa-tachometer"></i> Equipement</a>
			</li>
			<li role="presentation" class="">
				<a href="#commandtab" aria-controls="profile" role="tab" data-toggle="tab" aria-expanded="false">
					<i class="fa fa-list-alt"></i> Commandes</a>
			</li>
			<li role="presentation" class="">
				<a href="#programationtab" aria-controls="profile" role="tab" data-toggle="tab" aria-expanded="false">
					<i class="fa fa-map"></i> {{Programation}}</a>
			</li>
			<li role="presentation" class="">
				<a href="#conditiontab" aria-controls="profile" role="tab" data-toggle="tab" aria-expanded="false">
					<i class="fa fa-map"></i> {{Conditions}}</a>
			</li>
			<li role="presentation" class="">
				<a href="#actiontab" aria-controls="profile" role="tab" data-toggle="tab" aria-expanded="false">
					<i class="fa fa-map"></i> {{Actions}}</a>
			</li>
		</ul>
			<div class="tab-content" style="height:calc(100% - 50px);overflow:auto;overflow-x: hidden;">
				<div role="tabpanel" class="tab-pane active" id="eqlogictab">
					<div class="row">
						<div class="col-sm-6">
							<form class="form-horizontal">
								<fieldset>
									<div class="form-group ">
										<label class="col-sm-2 control-label">{{Nom de la Zone}}
											<sup>
												<i class="fa fa-question-circle tooltips" title="Indiquer le nom de votre zone" style="font-size : 1em;color:grey;"></i>
											</sup>
										</label>
										<div class="col-sm-5">
											<input type="text" class="eqLogicAttr form-control" data-l1key="id" style="display : none;" />
											<input type="text" class="eqLogicAttr form-control" data-l1key="name" placeholder="{{Nom du groupe de zones}}"/>
										</div>
									</div>
									<div class="form-group">
										<label class="col-sm-2 control-label" >{{Objet parent}}
											<sup>
												<i class="fa fa-question-circle tooltips" title="Indiquer l'objet dans lequel le widget de cette zone apparaîtra sur le Dashboard" style="font-size : 1em;color:grey;"></i>
											</sup>
										</label>
										<div class="col-sm-5">
											<select id="sel_object" class="eqLogicAttr form-control" data-l1key="object_id">
												<option value="">{{Aucun}}</option>
												<?php
													foreach (object::all() as $object)
														echo '<option value="' . $object->getId() . '">' . $object->getName() . '</option>';
												?>
											</select>
										</div>
									</div>
									<div class="form-group">
										<label class="col-md-2 control-label">
											{{Catégorie}}
											<sup>
												<i class="fa fa-question-circle tooltips" title="Choisissez une catégorie
		Cette information n'est pas obligatoire mais peut être utile pour filtrer les widgets" style="font-size : 1em;color:grey;"></i>
											</sup>
										</label>
										<div class="col-md-8">
											<?php
											foreach (jeedom::getConfiguration('eqLogic:category') as $key => $value) {
												echo '<label class="checkbox-inline">';
												echo '<input type="checkbox" class="eqLogicAttr" data-l1key="category" data-l2key="' . $key . '" />' . $value['name'];
												echo '</label>';
											}
											?>

										</div>
									</div>
									<div class="form-group">
										<label class="col-sm-2 control-label" >
											{{Etat du widget}}
											<sup>
												<i class="fa fa-question-circle tooltips" title="Choisissez les options de visibilité et d'activation
		Si l'équipement n'est pas activé, il ne sera pas utilisable dans Jeedom ni visible sur le Dashboard
		Si l'équipement n'est pas visible, il sera caché sur le Dashboard" style="font-size : 1em;color:grey;"></i>
											</sup>
										</label>
										<div class="col-sm-5">
											<label>{{Activer}}</label>
											<input type="checkbox" class="eqLogicAttr" data-label-text="{{Activer}}" data-l1key="isEnable" checked/>
											<label>{{Visible}}</label>
											<input type="checkbox" class="eqLogicAttr" data-label-text="{{Visible}}" data-l1key="isVisible" checked/>
										</div>
									</div>
									<div class="form-group">
										<label class="col-sm-2 control-label" >
											{{Type d'arrosage}}
											<sup>
												<i class="fa fa-question-circle tooltips" title="Choisissez les types d'arrosage pour cette zone" style="font-size : 1em;color:grey;"></i>
											</sup>
										</label>
										<div class="col-sm-5">
											<select class="eqLogicAttr form-control" data-l1key="configuration" data-l2key="TypeArrosage" >
												<?php
													foreach(config::byKey('configuration','arrosageAuto') as $type => $value){
														if($type=='type'){
															if(is_array($value)){
																foreach($value as $valeur)
																	echo '<option value="'.$valeur.'">'.$valeur.'</option>';
															}else
																echo '<option value="'.$value.'">'.$value.'</option>';
														}
													}
												?>
											</select>
										</div>
									</div>
								</fieldset>
							</form>
						</div>
						<div class="col-sm-6">
							<form class="form-horizontal">
								<fieldset>
									<div class="form-group">
										<label class="col-sm-2 control-label" >
											{{Type d'arroseur}}
											<sup>
												<i class="fa fa-question-circle tooltips" title="Choisir le type d'arroseur" style="font-size : 1em;color:grey;"></i>
											</sup>
										</label>
										<div class="col-sm-5">
											<select class="eqLogicAttr form-control" data-l1key="configuration" data-l2key="TypeGicler" >
												<option value="gouteAgoute">{{Goutte à goutte}}</option>
												<option value="turbine">{{Turbine / Tuyère}}</option>
											</select>
										</div>
									</div>
									<div class="form-group TypeCalcul">
									</div>
									<!--div class="form-group">
										<label class="col-sm-2 control-label" >
											{{Pluviometrie des arroseur (mm/h)}}
											<sup>
												<i class="fa fa-question-circle tooltips" title="Saisir la pluviometrie d'arrosage (mm/h)" style="font-size : 1em;color:grey;"></i>
											</sup>
										</label>
										<div class="col-sm-5">
											<input class="eqLogicAttr form-control" data-l1key="configuration" data-l2key="DebitGicler" />
										</div>
									</div-->
								</fieldset>
							</form>
						</div>
					</div>
				</div>
				<div role="tabpanel" class="tab-pane" id="programationtab">
					<form class="form-horizontal">
						<fieldset>
							<legend>{{Les programmations de la zone :}}
								<sup>
									<i class="fa fa-question-circle tooltips" title="Saisir toutes les programmations pour la zone"></i>
								</sup>
								<a class="btn btn-success btn-xs ProgramationAttr" data-action="add" style="margin-left: 5px;">
									<i class="fa fa-plus-circle"></i>
									{{Ajouter une programmation}}
								</a>
							</legend>
						</fieldset>
					</form>
					<table id="table_programation" class="table table-bordered table-condensed">
						<thead>
							<tr>
								<th></th>
								<th>Jour actif</th>
								<th>Heure</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
				<div role="tabpanel" class="tab-pane" id="conditiontab">
					<form class="form-horizontal">
						<fieldset>
							<legend>{{Les conditions d'exécution :}}
								<sup>
									<i class="fa fa-question-circle tooltips" title="Saisir toutes les conditions d'exécution de la gestion"></i>
								</sup>
								<a class="btn btn-success btn-xs conditionAttr" data-action="add" style="margin-left: 5px;">
									<i class="fa fa-plus-circle"></i>
									{{Ajouter une condition}}
								</a>
							</legend>
						</fieldset>
					</form>
					<table id="table_condition" class="table table-bordered table-condensed">
						<thead>
							<tr>
								<th></th>
								<th>Condition</th>
								<th>Paramètre d'évaluation</th>
								<th></th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
				<div role="tabpanel" class="tab-pane" id="actiontab">
					<form class="form-horizontal">
						<fieldset>
							<legend>{{Les actions :}}
								<sup>
									<i class="fa fa-question-circle tooltips" title="Saisir toutes les actions à mener à l'ouverture"></i>
								</sup>
								<a class="btn btn-success btn-xs ActionAttr" data-action="add" style="margin-left: 5px;">
									<i class="fa fa-plus-circle"></i>
									{{Ajouter une action}}
								</a>
							</legend>
						</fieldset>
					</form>
					<table id="table_action" class="table table-bordered table-condensed">
						<thead>
							<tr>
								<th></th>
								<th>Action</th>
								<th>Valeur</th>
								<th>Exécution</th>
							</tr>
						</thead>
						<tbody></tbody>
					</table>
				</div>
				<div role="tabpanel" class="tab-pane" id="commandtab">
					<table id="table_cmd" class="table table-bordered table-condensed">
					    <thead>
						<tr>
						    <th>Nom</th>
						    <th>Paramètre</th>
						</tr>
					    </thead>
					    <tbody></tbody>
					</table>
				</div>
			</div>
		</div>
</div>

<?php include_file('desktop', 'arrosageAuto', 'js', 'arrosageAuto'); ?>
<?php include_file('core', 'plugin.template', 'js'); ?>
