$(function() {
	
	
	var season_calendar = {
			
			init: function (config){
				
				
				// that are selectables fields
				this.selectable = config.selectable;
				
				// callback function
				this.onSelect = (typeof config.onSelect == 'function') ? config.onSelect : false;

				// first and last selected field
				this.first = undefined;
				this.last = undefined;

				this._click();
				
			},
	
			// function that control clicks and initiate the first and last day
			_click: function(){
				
				var self = this;
				
				this.selectable.each(function (){
					
					$(this).click(function(){

						if(self.first == undefined){
							
							self.first = $(this).addClass('first');
							
							self._selectable();
							
						}else{
							self.last = $(this).addClass('last');
							
							self._prepData();

							
							self.selectable.removeClass('first').removeClass('last').removeClass('active');
							
							self.first = undefined;
							self.last = undefined;
							
							self.selectable.unbind('mouseenter mouseleave')
						}

					});
				});
			},
			
			// function to mark the days if the first day is selected
			_selectable: function (){
				 
				 var self = this;

				 self.selectable.hover(function (){
					 
					if(self.first != undefined){

						self.selectable.removeClass('active');
	
						var start =  self.selectable.index(self.first);
						var end = self.selectable.index($(this));
						
						if(end < start){
							var change = start;
							
							start = end;
							end = change;
						}
	
						for (var i = start; i <= end; i++){
							self.selectable.eq(i).addClass('active');
						}
					
					}
				});
	
			},
			
			// prepare the object data with the first day, the last day, all the season and return it
			_prepData : function(){

				var start =  this.selectable.index(this.first);
				var end = this.selectable.index(this.last);
				
				if(end < start){
					
					var change = start;
					
					start = end;
					end = change;

				}
	
				this.data = 				
					new Object();
				
				this.data.first = this.first;
				this.data.last = this.last;
				this.data.temp = new Array();
				
				for (var i = start; i <= end; i++){
					this.data.temp.push(this.selectable.eq(i));
				}

				this._onSelect();

			},
			
			// callback function
			_onSelect: function (){
				this.onSelect.call(this, this.data);
			}
	}

	// call the function season_calendar and initiate all values
	season_calendar.init({
		'selectable' : $('.selectable'),
		'onSelect' : function(data){

			// returns an obj with the first day (data.first), the last day (data.last) and season (data.temp)
			
			var cnt = $('#dateBox p').length;

			var p = $('<p>').html('<input name="temp_start['+ cnt +']"  value="'+ data.first.data('date') +'" /><input name="temp_end['+ cnt +']" value="'+ data.last.data('date') +'" />');
			
			$('#dateBox').append(p);
			
		}
	});
});
