
###
 GET home page.
###

exports.home = (req, res) ->

	if not req.session or not req.session.connected
		res.redirect "/"
	else
		options = 
			title: "Welcome - IpVIOPE"
			lorem: get_lorem( 10000 )

		res.render 'home', options



get_lorem = ( length )->

	l= """

	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas lacinia tortor blandit, mattis massa in, iaculis diam. Nulla rhoncus elit dui, ut lacinia nulla sagittis non. In mattis dui at mauris dignissim, ut adipiscing sapien iaculis. Aliquam consectetur massa vitae lectus aliquam, sed dictum lectus porta. Duis sed turpis euismod, pretium eros sit amet, tristique nulla. Cras at gravida magna. Sed eget consequat augue. Aenean ac sollicitudin tellus, ac dapibus neque. Cras et dictum mauris, ut dignissim lacus.

	Mauris ac lorem auctor, porttitor justo quis, ullamcorper nisi. Suspendisse vitae tellus sed nulla commodo tristique. Nulla suscipit sem ut faucibus auctor. Vivamus eget fringilla orci. Cras at nunc at nunc luctus pretium. Donec nec est adipiscing, ullamcorper tellus ac, fringilla ipsum. Mauris at enim blandit, sagittis ante eu, lobortis risus. Fusce eget nisi elit.
	
	Morbi gravida, est in consequat viverra, velit nibh sodales augue, at lobortis nibh lacus at odio. Ut volutpat lacus ut sapien facilisis, non cursus tortor convallis. Cras vel diam at mauris vehicula rutrum quis dictum dolor. Nullam in auctor magna. Aliquam sit amet elementum lectus. In vel tristique felis. Nam ultrices ultricies libero, eget dapibus est dictum at. Nam tempus tortor diam, quis pellentesque dolor pretium iaculis. Nulla eget sem eget ante tincidunt mollis.
	
	Praesent tempus non mauris a consectetur. Sed vitae viverra sem. Vestibulum quis mauris elit. Nulla placerat euismod nulla, eget ornare elit vestibulum in. Aenean elementum nisl tempor quam sagittis varius. Cras iaculis rhoncus neque, non suscipit metus fermentum sed. Quisque rutrum nibh sit amet lorem congue auctor. Fusce convallis luctus massa, nec volutpat tortor varius sit amet. Fusce mollis at sapien ac faucibus. In hac habitasse platea dictumst. Suspendisse est orci, porttitor sed euismod eu, posuere nec purus. Proin tincidunt libero justo, sed egestas velit ultricies sit amet. Proin pharetra libero at metus tristique imperdiet.
	
	Sed erat dolor, mattis nec imperdiet ac, tincidunt a ante. Integer sed dui lacinia, ornare lacus et, euismod elit. Duis dictum adipiscing dui nec placerat. Morbi accumsan sagittis laoreet. Mauris odio nunc, tempor eget eros a, auctor dapibus ipsum. Nam vehicula tempor eros, ut lacinia dui consectetur sed. Nam tortor ante, tristique in congue non, hendrerit eget magna. Suspendisse a iaculis dui, vel lacinia dui. Fusce eget feugiat dui. Pellentesque rutrum felis id metus tempor malesuada.
	
	Pellentesque posuere turpis at nulla lobortis, sed elementum nulla venenatis. In eget rutrum erat. Curabitur a augue arcu. Cras tincidunt ipsum interdum, vehicula augue convallis, eleifend dui. Praesent euismod massa turpis, et auctor tortor tempus sed. Phasellus bibendum volutpat metus eget fringilla. Aliquam in vulputate mauris. Aenean condimentum vel dui non sagittis. Nam hendrerit fermentum libero, eu porta nibh auctor accumsan. Donec fermentum enim non laoreet tempor. Donec sed ante tincidunt, ornare diam at, suscipit quam.
	
	Nunc ultricies sit amet ligula in fermentum. Integer quis nibh quis justo pharetra aliquam non sit amet arcu. Vivamus iaculis, lorem ut tincidunt rhoncus, nisl magna consectetur turpis, vel interdum felis orci id massa. Curabitur at dolor tristique, vulputate orci at, pellentesque sapien. Donec eget enim sed est tristique imperdiet non non ligula. Maecenas suscipit nunc sed consectetur malesuada. Cras porta odio et tellus condimentum, a ultricies lectus pellentesque. Fusce quis pulvinar tellus. Duis eget magna eget nisl placerat laoreet at eget justo. Integer faucibus arcu risus, vel bibendum mauris egestas vel.
	
	Aliquam sodales ac enim ac sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pretium condimentum elementum. In et lorem hendrerit, porta tellus in, consequat tellus. Aenean velit urna, tempor aliquam facilisis et, posuere ac dui. Phasellus non lectus ipsum. Nulla ac sapien in orci sagittis mattis non sed felis. In hac habitasse platea dictumst. Nunc nisl lorem, rhoncus ut diam et, laoreet vestibulum eros. Fusce et convallis felis. Pellentesque ullamcorper dictum magna eu iaculis. Nullam porttitor lobortis vestibulum. Donec libero enim, suscipit sed justo eu, venenatis dignissim libero. Sed quis metus nec mauris iaculis dignissim sed venenatis risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pharetra magna eu porttitor congue.
	
	Aliquam convallis ultrices accumsan. Aenean erat quam, feugiat luctus gravida et, commodo id enim. Vivamus at enim lacus. Morbi posuere aliquam ligula at hendrerit. Pellentesque condimentum lectus in nunc dignissim, in euismod ipsum suscipit. Fusce imperdiet risus et lacus elementum iaculis. Maecenas urna metus, euismod et consequat sit amet, eleifend id dui. Nulla suscipit vestibulum porttitor. Morbi magna tortor, posuere in tellus vitae, accumsan ullamcorper erat. Suspendisse vitae felis eu quam venenatis suscipit et id justo. Phasellus sit amet justo leo. Pellentesque ut dui tincidunt, suscipit ipsum eget, venenatis lorem. Proin rhoncus interdum blandit.
	
	Sed pellentesque est sed orci viverra, id ullamcorper leo tincidunt. Cras placerat justo nisl, eu condimentum lectus elementum a. Mauris lobortis leo eu leo commodo, vel eleifend ligula scelerisque. Aenean ac facilisis lacus. Curabitur nec arcu vitae odio adipiscing elementum a in est. Curabitur vel est nisl. Donec venenatis fermentum arcu et semper. Aenean dignissim erat in felis consectetur, at ornare tortor iaculis. Nulla fermentum tincidunt tortor, a hendrerit diam posuere eu. Vivamus sed sollicitudin est. Aenean pretium euismod ligula euismod interdum. Vivamus lorem risus, congue in pretium nec, congue congue mi. Nunc enim turpis, pulvinar in dapibus et, pellentesque et nunc. Nulla volutpat mattis tortor.
	
	Proin vitae est a dolor consectetur posuere. Ut pulvinar lectus nec auctor placerat. Donec a enim turpis. Aliquam erat volutpat. Sed auctor, libero sit amet dapibus gravida, diam enim venenatis odio, et rhoncus lacus justo eu leo. Fusce malesuada hendrerit dignissim. Vestibulum malesuada massa vitae sem lacinia rutrum. Fusce mattis enim vitae neque vulputate convallis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam imperdiet laoreet sapien, malesuada imperdiet dui aliquam nec.
	
	Nunc porttitor mattis dui vel blandit. In hac habitasse platea dictumst. Integer sapien arcu, faucibus eget luctus a, interdum sodales eros. Morbi interdum, libero id egestas imperdiet, ligula erat accumsan ante, eu mattis ante mi quis ligula. Fusce consequat aliquam arcu quis sodales. Aenean condimentum, massa congue gravida egestas, neque justo luctus tortor, eu pretium metus nisl fringilla velit. Donec ac congue justo, at rutrum diam. Vivamus mollis purus id dui fringilla, ac convallis dui mollis. Phasellus fringilla elit sit amet porttitor fringilla. Nam bibendum ultricies pellentesque. Aenean fringilla lorem nisi, ut pharetra augue ultricies ut. In molestie sed mauris a dictum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec suscipit eleifend gravida.
	
	Vivamus metus tellus, vestibulum et leo vel, fermentum luctus ligula. Pellentesque quis arcu sed nunc suscipit pellentesque. Nulla viverra dignissim arcu, eu pretium mi sagittis ut. Vivamus vitae augue mi. Sed mi mi, elementum vitae lobortis ut, scelerisque eget mauris. Nam porta nunc nisl, vel faucibus arcu vulputate eget. Sed at dictum odio, eu adipiscing mauris. Nam quis metus venenatis, mattis diam sed, mattis elit. Nulla ultrices quis odio et vestibulum. Nulla quam augue, aliquet sed massa vitae, lacinia sagittis turpis. In aliquet placerat euismod.
	
	Fusce convallis, tortor eu accumsan sollicitudin, nunc enim scelerisque velit, eu sodales tortor dolor sit amet libero. Pellentesque ornare libero odio, a commodo metus tincidunt quis. Curabitur sodales ultrices urna. Vestibulum orci risus, condimentum quis diam in, varius rutrum tellus. Integer accumsan fermentum feugiat. Aliquam facilisis ac odio at condimentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. In eget pharetra justo. Sed faucibus leo ultricies, ornare augue eget, tincidunt dolor. Vestibulum volutpat cursus tristique. Nulla sodales commodo nunc, sed consequat urna malesuada ac. Mauris gravida mauris eget massa lacinia semper.
	
	Curabitur lacinia mollis quam at viverra. Sed blandit gravida dolor, vitae suscipit nibh ultrices non. Aenean neque mauris, placerat volutpat consequat vel, auctor sit amet felis. Nunc convallis ultricies est sit amet mattis. Fusce ullamcorper, tortor sed feugiat aliquet, tellus enim iaculis orci, quis ultrices ipsum nulla et massa. Suspendisse consequat urna risus, sed commodo nisi suscipit tempus. In in mi turpis. Donec viverra est sed nunc interdum, quis interdum enim fringilla. Pellentesque in nibh vulputate, volutpat elit eget, pellentesque metus. Suspendisse a fermentum felis. Duis eget nisl eu ligula semper iaculis a eu ipsum. Donec elit diam, convallis sed quam in, condimentum lacinia arcu. Nullam viverra quam in leo mattis cursus. Nunc pharetra velit sit amet commodo ornare. Vestibulum scelerisque interdum ultrices.
	
	Morbi blandit, elit vitae congue faucibus, nibh massa ornare sem, eu gravida justo est vel nisl. Aenean fermentum dui vitae justo ullamcorper, vel ultrices lorem facilisis. Curabitur sit amet dui sed nisl semper bibendum ac ut dui. Mauris eleifend eget ipsum dapibus sodales. Suspendisse tincidunt, purus vitae elementum mollis, nisl ipsum mattis sapien, id pretium metus lectus nec tellus. Donec vitae dui mi. Quisque ultricies leo a libero dapibus mollis eget non magna. Aenean at posuere dui, tristique posuere leo. Aenean facilisis malesuada massa at adipiscing. Sed elit nulla, elementum a erat sit amet, condimentum suscipit nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer aliquet purus et vulputate faucibus. Etiam vulputate lacinia ullamcorper.
	
	
	"""

	return l.substr 0, length