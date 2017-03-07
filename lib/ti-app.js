        (function(document,navigator,standalone) {
            // prevents links from apps from oppening in mobile safari
            // this javascript must be the first script in your head
            if ((standalone in navigator) && navigator[standalone]) {
                var curnode, location=document.location, stop=/^(a|html)$/i;
                document.addEventListener('click', function(e) {
                    curnode=e.target;
                    while (!(stop).test(curnode.nodeName)) {
                        curnode=curnode.parentNode;
                    }
                    // Condidions to do this only on links to your own app
                    // if you want all links, use if('href' in curnode) instead.
                    if('href' in curnode && ( curnode.href.indexOf('http') || ~curnode.href.indexOf(location.host) ) ) {
                        e.preventDefault();
                        location.href = curnode.href;
                    }
                },false);
            }
        })(document,window.navigator,'standalone');

         function initialize() {
           google.maps.visualRefresh = true;
         
         
           var mapDiv = document.getElementById('googft-mapCanvas');
           var map = new google.maps.Map(mapDiv, {
             center: new google.maps.LatLng(-30.3333, 152.7167),
             zoom: 4,
             mapTypeId: google.maps.MapTypeId.ROADMAP
           });
         
           var mini = document.getElementById("min. level");
           var miniVal = mini.options[mini.selectedIndex].value;
           var maxi = document.getElementById("max. level");
           var maxiVal = maxi.options[maxi.selectedIndex].value;
           var minig = document.getElementById("min. grade");
           var miniValg = minig.options[minig.selectedIndex].value;
           var maxig = document.getElementById("max. grade");
           var maxiValg = maxig.options[maxig.selectedIndex].value;
           var mults = document.getElementById("type");
           var mult = mults.options[mults.selectedIndex].value;
           var sid = mult*2
           var tid = mult*3
           var layer = new google.maps.FusionTablesLayer({
             map: map,
             heatmap: { enabled: false },
             query: {
         select: "col11",
         from: "1xOnTf3qaHEzBGDv0iSEihtLUMK7nIn9QV2ED17ke",
         where:  "col15 \x3e\x3d "+miniVal+" and col15 \x3c\x3d "+maxiVal+" and col14 \x3e\x3d "+miniValg+" and col16 \x3c\x3d "+maxiValg
             },
             options: {
         styleId: sid,
         templateId: tid
             }
           });
         
         // Create the legend and display on the map
         if(mult==1){
         var redtext = "Low Level"
         var yeltext = "Visual"
         var gretext = "Good Level"
         var blutext = "High Level"
         }
         else{
         var redtext = "24h < 10mm OR <br><div class='box white'></div> 5-day < 30mm"
         var yeltext = "24h < 20mm OR <br><div class='box white'></div> 5-day < 50mm"
         var gretext = "24h < 40mm OR <br><div class='box white'></div> 5-day < 80mm"
         var blutext = "24h > 40mm OR <br><div class='box white'></div> 5-day > 80mm"
         }
         var legend = document.createElement('div');
         legend.id = 'legend';
         var content = [];
         content.push('<p><input type="checkbox" name="hide" value = 1 onclick = "showHide()"> Hide </p>')
         content.push('<h3>Legend</h3>');
         content.push('<p><div class="color red"></div>'+redtext+'</p>');
         content.push('<p><div class="color yellow"></div>'+yeltext+'</p>');
         content.push('<p><div class="color green"></div>'+gretext+'</p>');
         content.push('<p><div class="color blue"></div>'+blutext+'</p>');
         content.push('<p><input type="checkbox" name="hide" value = 1 onclick = "showHide()"> Hide </p>')
         legend.innerHTML = content.join('');
         legend.index = 1;
         map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
         
         }
         function showHide() {
          var el = document.getElementById('legend');
         el.value+=1
         if (el.value % 2 ===0){
              el.style.display = 'block';
         }
         else{
         el.style.display = 'none';
         }
         
         }
         
         
         google.maps.event.addDomListener(window, 'load', initialize);

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAPGboQdrh1wMjLi6cxhPF53NNuCdbRgBY",
    authDomain: "taylored-instruction.firebaseapp.com",
    databaseURL: "https://taylored-instruction.firebaseio.com",
    storageBucket: "taylored-instruction.appspot.com",
    messagingSenderId: "1091342339175"
  };
  firebase.initializeApp(config);

		   function signIn(){
			window.location.href = 'https://tayloredinstruction.github.io/login.html?target=index.html'
		   }
		   function signOut(){
			   firebase.auth().signOut().then(function() {
  alert('Signed Out');
  window.location.href = 'https://tayloredinstruction.github.io/'

}, function(error) {
  console.error('Sign Out Error', error);
});
		   }
		  
		   function openHTab(event, divName) {
  var i, x, tablinks;
    var x = document.getElementsByClassName("HTab");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
	tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" w3-green", "");
  }
    document.getElementById(divName).style.display = "block"; 
    event.currentTarget.className += " w3-green";
}

		    setTimeout(stopLoader, 3000);
		    function stopLoader(){
			    document.getElementById("userLoad").className=""
		document.getElementById("loadContainerUser").className=""
			    document.getElementById("appLoad").className=""
		document.getElementById("loadContainerApp").className=""
			     document.getElementById("tripLoad").className=""
		  document.getElementById("loadContainerTrip").className=""
		    }
		    
		    function updateInfo(){
			    var user = firebase.auth().currentUser
			    var info = document.getElementById("myinfo").value
			firebase.database().ref('users/'+user.uid+'/info').update({
			about: info
   });    
		    }
               firebase.auth().onAuthStateChanged(function() {
		       approveList();
      usertriplist();
		       logList();
		       document.getElementById("loginbook").className="w3-hide"
		       document.getElementById("loggedInBook").className=""     
                  var user = firebase.auth().currentUser
		        firebase.database().ref('users/'+user.uid+'/info').update({
         name: user.displayName,
         uid: user.uid})
		  document.getElementById("userino").innerHTML="Signed in as "+user.displayName+". "
		  document.getElementById("infodiv").className=""
		  return firebase.database().ref('users/'+user.uid+'/info').once('value').then(function(snapshot) {
		  document.getElementById("myinfo").defaultValue=snapshot.val().about
			  if(snapshot.val().favourites === undefined || snapshot.val().favourites === null){
				clearfavs()
			  }
			  else{
		localStorage.favslist=snapshot.val().favourites
			  }
			  displayfavs()
		document.getElementById("userLoad").className=""
		document.getElementById("loadContainerUser").className=""
		  });

   });
		    function notificationChecker(){
			    var y = document.getElementById("approveWait").childNodes.length+document.getElementById("approveInvite").childNodes.length;
			    if(y===0){
			    document.getElementById("notBadge").innerHTML=""
			    }
			    else{
			    document.getElementById("notBadge").innerHTML=y
			    }
			    if(document.getElementById("approveWait").childNodes.length===0 && document.getElementById("approveInvite").childNodes.length===0){
			        console.log("no notifications")
				document.getElementById("noNotification").className=""
		    }
		    }
		    function approveList(){
               var user=firebase.auth().currentUser.uid
               var paraWait = document.getElementById("approveWait");
               var paraInvite = document.getElementById("approveInvite");
               firebase.database().ref('users/'+user+'/trips').once('value').then(function(snapshot) {
			for(var i in snapshot.val()){
				var item=snapshot.val()[i]
				if(item.uid===user){
				var trip=i
				firebase.database().ref('trips/active/'+trip).on('value', function(snapshot) {
					document.getElementById("noNotification").className="w3-hide"
					if(document.getElementById(snapshot.key+"notification")){
						var element = document.getElementById(snapshot.key+"notification");
						element.parentNode.removeChild(element);
					}
					var idiv=document.createElement('div')
					idiv.id=snapshot.key+"notification"
					               var contentsWait = new Array()
						       if(snapshot.val()){
							
						
					for (var j in snapshot.val().waiting){
						
						var name = snapshot.val().waiting[j].name;
						var about = snapshot.val().waiting[j].about;
						var email =snapshot.val().waiting[j].email;
						var id= snapshot.val().waiting[j].id;
						var node = "<p>"+ name + " would like to join " + snapshot.val().details.trip +". <br> About: "+about+"<br> Email: "+email+"<br><button onClick=\"appReq(\'"+snapshot.key+"\',\'"+id+"\')\">Approve</button><button onClick=\"denReq(\'"+snapshot.key+"\',\'"+id+"\')\">Deny</button></p>"
						contentsWait.push(node)
						}
						       }
					idiv.innerHTML=contentsWait.join("")
					paraWait.appendChild(idiv)
					if (contentsWait.join("")===""){
						var element = document.getElementById(snapshot.key+"notification");
						element.parentNode.removeChild(element);
					}
					notificationChecker()
				});
				
			}
			}	
                     });
		firebase.database().ref('users/' + user + '/trips/invited' ).on('value', function(snapshot) {
		document.getElementById("noNotification").className="w3-hide"
		 var contentsInvite = new Array()
                  snapshot.forEach(function(childSnapshot) {
			var data = childSnapshot.val()
                     var node = '<p id="'+childSnapshot.key+'inv">Trip Organiser: '+ data.organiser+'<br>Trip Name: ' + data.trip + '<br>Section: ' + data.section + '<br>Date and Time: ' + data.date +'<br>Contact Email: '+ data.email + '<br>Contact Phone Number: ' + data.phone + '<br>Additional Information: ' + data.info + '<br><button onClick=\"accReq(\''+childSnapshot.key+"\',\'"+user+"\')\">Accept</button><button onClick=\"decReq(\'"+childSnapshot.key+"\',\'"+user+"\')\">Decline</button></p>"
                     contentsInvite.push(node);                       
                     });
                     paraInvite.innerHTML=contentsInvite.join("")
			notificationChecker()
                  });
               }
		    
		function accReq(trip, user){
			document.getElementById(trip+"inv").className=("w3-hide")
			moveFbRecord(firebase.database().ref('users/'+user+'/trips/invited/'+trip),firebase.database().ref('users/'+user+'/trips/'+trip))
			moveFbRecord(firebase.database().ref('trips/active/'+trip+'/invited/'+user),firebase.database().ref('trips/active/'+trip+'/confirmed/'+user))
			firebase.database().ref('/trips/active/'+trip).once('value').then(function(snapshot){
				var participants = snapshot.val().details.participants
				firebase.database().ref('/trips/active/'+trip+'/details').update({
				participants: participants+', '+snapshot.val().confirmed[user].name
				}											      )
			})
		}
		    function decReq(trip, user){
			document.getElementById(trip+"inv").className=("w3-hide")
			firebase.database().ref('users/'+user+'/trips/invited/'+trip).set(null)
			firebase.database().ref('trips/active/'+trip+'/invited/'+user).set(null)		
			
		}
		    function appReq(trip, user){
			document.getElementById(trip+"notification").className=("w3-hide")
			copyFbRecord(firebase.database().ref('trips/active/'+trip+'/details/'), firebase.database().ref('users/'+user+'/trips/'+trip))
			moveFbRecord(firebase.database().ref('trips/active/'+trip+'/waiting/'+user),firebase.database().ref('trips/active/'+trip+'/confirmed/'+user))
			firebase.database().ref('/trips/active/'+trip).once('value').then(function(snapshot){
				var participants = snapshot.val().details.participants
				firebase.database().ref('/trips/active/'+trip+'/details').update({
				participants: participants+', '+snapshot.val().confirmed[user].name
				}											      )
			})
		}
		    function denReq(trip, user){
			document.getElementById(trip+"notification").className=("w3-hide")
			firebase.database().ref('trips/active/'+trip+'/waiting/'+user).set(null)
		}
		    
		function copyFbRecord(oldRef, newRef) {    
     oldRef.once('value', function(snap)  {
          newRef.set( snap.val(), function(error) {
               if( error && typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
          });
     });
}  

		    
               function moveFbRecord(oldRef, newRef) {    
     oldRef.once('value', function(snap)  {
          newRef.set( snap.val(), function(error) {
               if( !error ) {  oldRef.remove(); }
               else if( typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
          });
     });
}     
          
		    function commentShow(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
}
            function usertriplist(){
               var user=firebase.auth().currentUser.uid
               var para = document.getElementById("mytrips");
               firebase.database().ref('users/' + user + '/trips' ).on('value', function(snapshot) {
		                      var contents = new Array()
				      console.log(snapshot.val()===null)
		       			console.log(snapshot.val())
		        if(snapshot.val()===null){
                        var node = "<p>No upcoming trips</p>"
                        contents.push(node)
			para.innerHTML=contents
                     }
                        else{
                  snapshot.forEach(function(childSnapshot) {
			  if(childSnapshot.key=="invited"){
			  }
			  else{
			var data = childSnapshot.val()
				 firebase.database().ref('trips/active/'+childSnapshot.key+'/details/').once('value').then(function(commSnapshot) {
				if(!(commSnapshot.val().comments) || commSnapshot.val().comments===null){
					var comments= ""
					}
				else{
					var comments = commSnapshot.val().comments
					}
                     var node = '<div>Trip Organiser: '+ data.organiser+'<br>Trip Name: ' + data.trip + '<br>Section: ' + data.section + '<br>Date and Time: ' + data.date +'<br>Contact Email: '+ data.email + '<br>Contact Phone Number: ' + data.phone + '<br>Participants: '+data.participants+'<br>Additional Information: ' + data.info + '<div class="w3-accordion"><button onclick="commentShow(\''+childSnapshot.key+'\')">Comments</button><div id="'+childSnapshot.key+'" class="w3-accordion-content w3-container"><div id="'+childSnapshot.key+'view">'+comments+'</div><input type="text" id="'+childSnapshot.key+"text"+'"><br><button onClick="addComment(\''+childSnapshot.key+'\')">Send</button></div></div></div><br>'
                     contents.push(node);
			para.innerHTML=contents.join("")
					 var x=$("#mytrips > div").length
					 console.log(x)
					 document.getElementById("tripBadge").innerHTML=x
					firebase.database().ref('trips/active/'+childSnapshot.key+'/details/').on('value', function(snapshot) {
						if(snapshot.val().comments){
  document.getElementById(childSnapshot.key+'view').innerHTML=snapshot.val().comments
						}
});
				});
			  }
			
                     });
			}
                  document.getElementById("tripLoad").className=""
		  document.getElementById("loadContainerTrip").className=""

                  });
               }
		    function addComment(id){
			    var comment = document.getElementById(id+'view').innerHTML
			    var user = firebase.auth().currentUser.displayName
			 firebase.database().ref('trips/active/'+id+'/details/').update({
				 comments: comment+"<b style='color:red'>"+user+'</b>:&nbsp;'+document.getElementById(id+"text").value+'<br>'
			 });
			    document.getElementById(id+'text').value=""
		    }
               function clearfavs() {
                  localStorage.removeItem("favslist")
                     localStorage.favslist = ""
    document.getElementById("pfav").innerHTML = "";
		  var user = firebase.auth().currentUser
			    if(user){
		       firebase.database().ref('users/'+user.uid+'/info').update({
         favourites: localStorage.favslist
		       })
			    }
                     }  
                
               function addtofavs(){
                  if(localStorage.favslist===undefined || localStorage.favslist===null){
                  localStorage.favslist=""
                  }
                  var favslist = localStorage.favslist
                 	var n = document.getElementById("newfav").value
                  var count = 0;
                  for( var j = 0; j<favslist.split(";").length-1; j++){
                  	if(n.toString() == favslist.split(";")[j]){
                          count+=1
                          }
                  }
                  if (count == 0){     
                 var json = JSON.parse(localStorage.json)
                    var favstring = n.toString()+";" 
                    localStorage.favslist=localStorage.favslist+favstring
                 }
			    var user = firebase.auth().currentUser
			    if(user){
		       firebase.database().ref('users/'+user.uid+'/info').update({
         favourites: localStorage.favslist
		       })
			    }
                    }
		    
                google.charts.load('current', {'packages':['corechart']});
                google.charts.setOnLoadCallback(displayfavs);
		    
			 function Comparator(a, b) {
   				if (new Date(a[0]) < new Date(b[0])) return -1;
   				if (new Date(a[0]) > new Date(b[0])) return 1;
  				 return 0;
 			}
                  function displayfavs(){
                  var json = JSON.parse(localStorage.json)  
                  var favsdiv = document.getElementById("favsdiv")
                  var favslist= localStorage.favslist
		  if(favslist===undefined || favslist===null || favslist===""){
		  }
			  else{
		var favslist= localStorage.favslist.split(";")
                 	var para = document.getElementById("pfav");
                  var contents = new Array()
                  for(var i = 0; i<favslist.length-1; i++){
			  for(var x=0; x<json.rows.length; x++){
				  if(favslist[i]===json.rows[x][1]){
					  var ref = x
					  break
					  }
			  }
               if (isNaN(json.rows[ref][5])){
               	var colour = "yellow !important";
		 var blankdiv=false
               	}
                      else if(json.rows[ref][5]<json.rows[ref][3]){
                      var colour = "red !important"
		      		 var blankdiv=true
                      }
			else if(json.rows[ref][5]>json.rows[ref][4] && json.rows[ref][4]!="-" && json.rows[ref][5]!=""){
                      var colour = "blue !important"
		      		 var blankdiv=true
                      }
                      else{
                      var colour = "green !important"
		      		 var blankdiv=true
                      }
		var qualityRegex = />(.+)</g,
                matches,
                qualities = [];
            while (matches = qualityRegex.exec(json.rows[ref][1])) {
              qualities.push(decodeURIComponent(matches[1]));
            }  
			  var secGraph = qualities[0]
			  if(blankdiv){
				  var divHeight = "200px"
				  }
			  else{
				  var divHeight=""
				  }
               	var node = "<p id = \""+secGraph+"\" style = \"border-left: 6px solid "+colour+";\">River: "+json.rows[ref][0]+" - "+json.rows[ref][1]+"<br>Levels: "+json.rows[ref][3]+"-"+json.rows[ref][4]+" Current: "+(Math.round(100*parseFloat(json.rows[ref][5]))/100).toString()+" Previous: "+(Math.round(100*parseFloat(json.rows[ref][6]))/100).toString()+"<br>Forecast: "+json.rows[ref][18]+"</p><div id = \""+secGraph+"curve_chart\" style = \"max-width:100% !important; height:"+divHeight+"\"></div>";
               	contents.push(node)
               
			  			para.innerHTML=contents.join("")
			  firebase.database().ref('sections/'+secGraph).off()
		firebase.database().ref('sections/'+secGraph).on('value', function(snapshot) {
			var dataArrayHead = [['Date', 'Level']]
			var dataArrayBody = new Array()
			for (var i in snapshot.val()){
			//var d = new Date(i)
			dataArrayBody.push([new Date(i),parseFloat(snapshot.val()[i])])
				//d.getDate().toString()+'/'+(d.getMonth()+1).toString()
			}
			var dataArrayBody=dataArrayBody.sort(Comparator)
			//for (var i=0; i<dataArrayBody.length; i++){
			//dataArrayBody[i].shift()
			//}
			if(dataArrayBody.length<=1){
				    document.getElementById(snapshot.key+'curve_chart').parentNode.removeChild;
			}
			else{
			var dataArray = dataArrayHead.concat(dataArrayBody)
		        var data = google.visualization.arrayToDataTable(dataArray);
        var options = {
          'title': snapshot.key,
          'curveType': 'function',
          'legend': 'none',
	  'width': '100%',
	  'hAxis': {gridlines: { count: 6 }}
        };

        var chart = new google.visualization.LineChart(document.getElementById(snapshot.key+'curve_chart'));

        chart.draw(data, options);
			}
		});
		  }
                  }
		  }
                    
                    	function removeOptions(selectbox)
               {
                   var i;
                   for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
                   {
               	selectbox.remove(i);
                   }
               }
               
                 function favpopulate(){
               	var json = JSON.parse(localStorage.json)
                   removeOptions(document.getElementById("newfav"));
                   var elm = document.getElementById('newfav'),
               	df = document.createDocumentFragment();
                   for (var i=0; i<json.rows.length; i++){	    
                   var div = document.createElement('div');
                   div.innerHTML= json.rows[i][1]
                     var option = document.createElement('option');
                     option.value = [json.rows[i][1]];
                     option.appendChild(document.createTextNode(json.rows[i][0]+" - "+div.textContent));
                     df.appendChild(option);
                   }
                   elm.appendChild(df);
               }   	

				       		   function openLTab(event, divName) {
  var i, x, tablinks;
    var x = document.getElementsByClassName("log");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";  
    }
	tablinks = document.getElementsByClassName("ltablink");
  for (i = 0; i < x.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" w3-green", "");
  }
    document.getElementById(divName).style.display = "block"; 
    event.currentTarget.className += " w3-green";
}

			    function hideLog(){
				    if(document.getElementById("logbooklist").value==-1){
					    document.getElementById("logmod").className="w3-hide"
				    }
				    else{
					document.getElementById("logmod").className=""
				    }

			    }
			    function downloadLog(){
				   var user = firebase.auth().currentUser.uid;
				firebase.database().ref('users/' + user + '/completed').once('value').then(function(snapshot) {
				   var data=snapshot.val()
				var log = '<table><tr style=\"border: 1px solid #000000; text-align: left\"><th>Organiser</th><th>Trip Name</th><th>Section</th><th>Date</th><th>Time</th><th>Email</th><th>Phone</th><th>Grade</th><th>Duration (hrs)</th><th>Distance (km)</th><th>Level</th><th>Participants</th><th>Role</th><th>Skills Practiced</th><th>Additional Info</th></tr>'
				   var parity=0
				   for (x in data){
					   if(parity%2===1){
						   var trstyle = "<tr style=\"background-color: #dddddd; border: 1px solid #000000; text-align: left\">"
						   }
					   else{
						   trstyle="<tr style=\"border: 1px solid #000000; text-align: left\">"
					   }
					 var details = data[x].details
					 log+=trstyle+'<td>'+details.organiser+'</td><td>'+details.trip+'</td><td>'+details.section+'</td><td>'+details.date+'</td><td>'+details.time+'</td><td>'+details.email+'</td><td>="'+details.phone+'"</td><td>="'+details.grade+'"</td><td>="'+details.duration+'"</td><td>="'+details.distance+'"</td><td>'+details.level+'</td><td>'+details.participants+'</td><td>'+details.role+'</td><td>'+details.skills+'</td><td>'+details.info+'</td></tr>'
				parity+=1		  
				   }
					log+='</table>'
						  document.getElementById("logDump").innerHTML = log;
						  });
    
			    }
			    function excelLog(){
				   var user = firebase.auth().currentUser.uid;
				firebase.database().ref('users/' + user + '/completed').once('value').then(function(snapshot) {
				   var data=snapshot.val()
				   var log = '<table><tr style=\"border: 1px solid #000000; text-align: left\"><th>Organiser</th><th>Trip Name</th><th>Section</th><th>Date</th><th>Time</th><th>Email</th><th>Phone</th><th>Grade</th><th>Duration (hrs)</th><th>Distance (km)</th><th>Level</th><th>Participants</th><th>Role</th><th>Skills Practiced</th><th>Additional Info</th></tr>'
				   var parity=0
				   for (x in data){
					   if(parity%2===1){
						   var trstyle = "<tr style=\"background-color: #dddddd; border: 1px solid #000000; text-align: left\">"
						   }
					   else{
						   trstyle="<tr style=\"border: 1px solid #000000; text-align: left\">"
					   }
					 var details = data[x].details
					 log+=trstyle+'<td>'+details.organiser+'</td><td>'+details.trip+'</td><td>'+details.section+'</td><td>'+details.date+'</td><td>'+details.time+'</td><td>'+details.email+'</td><td>="'+details.phone+'"</td><td>="'+details.grade+'"</td><td>="'+details.duration+'"</td><td>="'+details.distance+'"</td><td>'+details.level+'</td><td>'+details.participants+'</td><td>'+details.role+'</td><td>'+details.skills+'</td><td>'+details.info+'</td></tr>'
				parity+=1		  
				   }
					log+='</table>'
					console.log(log)
					 sa = true;
     var myBlob =  new Blob( [log] , {type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
					console.log(myBlob)
     var url = window.URL.createObjectURL(myBlob);
     var a = document.createElement("a");
     document.body.appendChild(a);
     a.href = url;
     a.download = firebase.auth().currentUser.displayName+" log.xls";
     a.click();
     setTimeout(function() {window.URL.revokeObjectURL(url);},0);
    
    return (sa);
  
						  });
    
			    }
			    
			    
			    function resizeInput() {
    var ins = document.getElementsByTagName("input")
    for (var x=0; x<ins.length;x++){
	    if (ins[x].type="text"){
            ins[x].size= ins[x].value.length;
	    }
    }
       

			    }
			    
			    
			    
			    
			    function logList(){
			var user=firebase.auth().currentUser.uid;
			firebase.database().ref('users/' + user + '/completed/').on('value', function(snapshot) {
				removeOptions(document.getElementById("logbooklist"));
				var elm = document.getElementById("logbooklist");
				var df = document.createDocumentFragment();
				var option = document.createElement('option');
                     option.value = -1;
                     option.appendChild(document.createTextNode("Choose a completed trip"));
                     df.appendChild(option);
				for(i in snapshot.val()){
                     var option = document.createElement('option');
                     option.value = i;
                     option.appendChild(document.createTextNode(snapshot.val()[i].details.trip +" - "+snapshot.val()[i].details.date));
                     df.appendChild(option);
                   }
                   elm.appendChild(df);
			});
			    }
			    
			   function getTrip(){
				 dispLog(document.getElementById("logbooklist").value)
			    }
		function dispLog(trip){
			var user=firebase.auth().currentUser.uid;
		firebase.database().ref('users/' + user + '/completed/'+trip).on('value', function(snapshot) {
			var data = snapshot.val()
			if(data.details.section.split("<")[1] === undefined ){
				var sec = data.details.section
				}
			else{
			var sec= data.details.section.split("<")[0]+data.details.section.split("<")[1].split(">")[1]
			}
                     document.getElementById("logUid").value=data.details.organiser
			document.getElementById("logTripname").value=data.details.trip
			 document.getElementById("logSec").value= sec
			 document.getElementById("logDate").value= data.details.date
			 document.getElementById("logTime").value= data.details.time
			document.getElementById("logEmail").value = data.details.email
			 document.getElementById("logPhone").value= data.details.phone
			 document.getElementById("logInfo").value= data.details.info
			document.getElementById("logLevel").value= data.details.level
			document.getElementById("logGrade").value= data.details.grade
			document.getElementById("logDuration").value= data.details.duration
			document.getElementById("logDistance").value= data.details.distance
			document.getElementById("logRole").value= data.details.role
			document.getElementById("logSkills").value= data.details.skills


			if(data.details.participants.length>0){
				document.getElementById("logParticipants").value=data.details.participants
			}
			else{
			  var names = new Array()
			  for(i in data.confirmed){
				names.push(data.confirmed[i].name)
			  }
			  document.getElementById("logGroupsize").value=names.join(", ")
			}
			resizeInput()
                     });
			
		}
			function newLog(){
			var user=firebase.auth().currentUser.uid;
			var logRef = firebase.database().ref().child('users/'+user+'/completed').push().key
			firebase.database().ref('users/' + user + '/completed/'+logRef+'/details').update({
                        uid: document.getElementById("newlogUid").value,
			trip: document.getElementById("newlogTripname").value,
			section: document.getElementById("newlogSec").value,
			date: document.getElementById("newlogDate").value,
			time: document.getElementById("newlogTime").value,
			email: document.getElementById("newlogEmail").value,
			phone: document.getElementById("newlogPhone").value,
			info: document.getElementById("newlogInfo").value,
			participants: document.getElementById("newlogParticipants").value,
			level: document.getElementById("newlogLevel").value,
			skills: document.getElementById("newlogSkills").value,
			role: document.getElementById("newlogRole").value,
			grade: document.getElementById("newlogGrade").value,
			duration: document.getElementById("newlogDuration").value,
			distance: document.getElementById("newlogDistance").value
				
                     });
				
					alert("Logbook updated")
				logList()	
					
		}
			function updateLog(){
				if(document.getElementById("logbooklist").value==-1){
					alert("You must select a trip that you have created or joined. For historic trips you can add a new trip then wait approx. one hour for it to appear here.")
				}
				else{
			var user=firebase.auth().currentUser.uid;
			firebase.database().ref('users/' + user + '/completed/'+document.getElementById("logbooklist").value+'/details').update({
                        uid: document.getElementById("logUid").value,
			trip: document.getElementById("logTripname").value,
			section: document.getElementById("logSec").value,
			date: document.getElementById("logDate").value,
			time: document.getElementById("logTime").value,
			email: document.getElementById("logEmail").value,
			phone: document.getElementById("logPhone").value,
			info: document.getElementById("logInfo").value,
			participants: document.getElementById("logParticipants").value,
			level: document.getElementById("logLevel").value,
			skills: document.getElementById("logSkills").value,
			role: document.getElementById("logRole").value,
			grade: document.getElementById("logGrade").value,
			duration: document.getElementById("logDuration").value,
			distance: document.getElementById("logDistance").value
				
                     });
				
					alert("Logbook updated")
					document.getElementById("logbooklist").selectedIndex = "0";
					hideLog()
				logList()	
				}	
		}
               function removeOptions(selectbox)
               {
                 var i;
                 for(i = selectbox.options.length - 1 ; i >= 0 ; i--)
                 {
               selectbox.remove(i);
                 }
               }
               function loadXMLDoc() {
               var xhttp = new XMLHttpRequest();
               xhttp.onreadystatechange = function() {
                 if (this.readyState == 4 && this.status == 200) {
               var json = JSON.parse(this.responseText);
                    localStorage.removeItem("json")
                    localStorage.json=JSON.stringify(json);
		favpopulate();
               	displayfavs();
                 }
               }
               xhttp.open("GET", "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+River%2C+Section%2C+Character%2C+'Min.+Level'%2C+'Max.+Level'%2C+'Current+Level'%2C+'12+hr+Previous'%2C+'Average+Grade'%2C+'Length+(km)'%2C+'Time+(hrs)'%2C+'Shuttle+(min)'%2C+'State'%2C+'Go+or+No'%2C+'Min+Grade'%2C+'Max+Grade'%2C+'Full+Description'%2c+'LATLONG IN'%2c+'Weather'%2c+'Forecast'+FROM+1xOnTf3qaHEzBGDv0iSEihtLUMK7nIn9QV2ED17ke&key=AIzaSyAvBPL76AXVKbwSpm9X1BlXTzaTXhNLYew", true);
               xhttp.send();
               }

              firebase.database().ref('trips/active').on('value', function(snapshot) {
		        var para = document.getElementById("tripp");
               var contents = new Array()
                  snapshot.forEach(function(childSnapshot) {
                     var data = childSnapshot.child('details').val();
		if(data.private === true || data.space ==="0"){
		   }
		   else{
                     var node = '<p>Trip Organiser: '+ data.organiser+'<br>Trip Name: ' + data.trip + '<br>Section: ' + data.section + '<br>Date and Time: ' + data.date + '<br>Max. Group Size: ' + data.groupsize + '<br>Contact Email: '+ data.email + '<br>Contact Phone Number: ' + data.phone + '<br>Additional Information: ' + data.info + '<br><button onclick=\"joinTrip(\''+childSnapshot.key+'\')\">Request to Join</button></p>'
                     contents.push(node);
		  }
                     });
                     para.innerHTML=contents.join("")
                  
                  });
               
                  function joinTrip(key){
                     var user=firebase.auth().currentUser
                  if(user){
			console.log(document.getElementById("myinfo").value)
                     firebase.database().ref('trips/active/' + key + '/waiting/'+ user.uid).update({
                          name: user.displayName,
                          id: user.uid,
                          email: user.email,
			  about: document.getElementById("myinfo").value
                     });   
			  alert("Request sent.")
		  }
                  else {
                     window.location.href = 'https://tayloredinstruction.github.io/login.html?target=index.html#trips'
                  }
                  }
            
initialize();
loadXMLDoc();
