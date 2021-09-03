/*Поддерживает ли браузер WebP изображение, если да body + class'webp' or 'no-webp' */
function testWebP(callback) {
   var webP = new Image();
   webP.onload = webP.onerror = function() {
      callback(webP.height == 2);
   };
   webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function(support) {
   if (support == true) {
      document.querySelector('body').classList.add('webp');
   } else {
      document.querySelector('body').classList.add('no-webp');
   }
});
/*Поддерживает ли браузер WebP изображение, если да body + class'webp' or 'no-webp' */

/*Опеределение устройства (Pc, Touch) ////////////////////////////////////////////////////////////////////////////////////////// */
const isMobile = {
   Android: function() {
      return navigator.userAgent.match(/Android/i);
   },
   BackBerry: function() {
      return navigator.userAgent.match(/BackBerry/i);
   },
   iOS: function() {
      return navigator.userAgent.match(/iPhote|iPad|iPod/i);
   },
   Opera: function() {
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function() {
      return navigator.userAgent.match(/IEMobile/i);
   },
   any: function() {
      return (
         isMobile.Android() ||
         isMobile.BackBerry() ||
         isMobile.iOS() ||
         isMobile.Opera() ||
         isMobile.Windows()
      );
   }
};

if (isMobile.any()) {
   document.body.classList.add('_pc');

   let menuArrows = document.querySelectorAll('.menu__arrow');
   if (menuArrows.length > 0) {
      for (let index = 0; index < menuArrows.length; index++) {
         const menuArrow = menuArrows[index];
         menuArrow.addEventListener("click", function(e) {
            menuArrow.parentElement.classList.toggle('_active');
         });
      }
   }

} else {
   document.body.classList.add('_pc');
} /*Если в else сменить _pc на _touch то будет баг на всех мобильных устройствах с открытием выпадающего меню в некоторых елементах */
/*Опеределение устройства (Pc, Touch) /////////////////////////////////////////////////////////////////////////////////// */

// Выпадающое меню //////////////////////////////////////////////////

function dropDownMenu() {
   document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
   if (!event.target.matches('.button__list')) {

      var dropdowns = document.getElementsByClassName("button__list-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
         var openDropdown = dropdowns[i];
         if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
         }
      }
   }
}

// Выпадающое меню //////////////////////////////////////////////////

/////Select-castom///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const selectSingle = document.querySelector('.__select');
const selectSingle_title = selectSingle.querySelector('.__select__title');
const selectSingle_labels = selectSingle.querySelectorAll('.__select__label');
// Toggle menu
selectSingle_title.addEventListener('click', () => {
   if ('active' === selectSingle.getAttribute('data-state')) {
      selectSingle.setAttribute('data-state', '');
   } else {
      selectSingle.setAttribute('data-state', 'active');
   }
});
// Close when click to option
for (let i = 0; i < selectSingle_labels.length; i++) {
   selectSingle_labels[i].addEventListener('click', (evt) => {
      selectSingle_title.textContent = evt.target.textContent;
      selectSingle.setAttribute('data-state', '');
   });
}
// Reset title
const reset = document.querySelector('.reset');
reset.addEventListener('click', () => {
   selectSingle_title.textContent = selectSingle_title.getAttribute('data-default');
});

/////Select-castom///////////////////////////////////////////////////////////////////////////////////////////////////////////////



/////Select-castom2///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function tamingselect() {
   if (!document.getElementById && !document.createTextNode) { return; }

   // Classes for the link and the visible dropdown
   var ts_selectclass = 'turnintodropdown'; // class to identify selects
   var ts_listclass = 'turnintoselect'; // class to identify ULs
   var ts_boxclass = 'dropcontainer'; // parent element
   var ts_triggeron = 'activetrigger'; // class for the active trigger link
   var ts_triggeroff = 'trigger'; // class for the inactive trigger link
   var ts_dropdownclosed = 'dropdownhidden'; // closed dropdown
   var ts_dropdownopen = 'dropdownvisible'; // open dropdown
   /*
   	Turn all selects into DOM dropdowns
   */
   var count = 0;
   var toreplace = new Array();
   var sels = document.getElementsByTagName('select');
   for (var i = 0; i < sels.length; i++) {
      if (ts_check(sels[i], ts_selectclass)) {
         var hiddenfield = document.createElement('input');
         hiddenfield.name = sels[i].name;
         hiddenfield.type = 'hidden';
         hiddenfield.id = sels[i].id;
         hiddenfield.value = sels[i].options[0].value;
         sels[i].parentNode.insertBefore(hiddenfield, sels[i])
         var trigger = document.createElement('a');
         ts_addclass(trigger, ts_triggeroff);
         trigger.href = '#';
         trigger.onclick = function() {
            ts_swapclass(this, ts_triggeroff, ts_triggeron)
            ts_swapclass(this.parentNode.getElementsByTagName('ul')[0], ts_dropdownclosed, ts_dropdownopen);
            return false;
         }
         trigger.appendChild(document.createTextNode(sels[i].options[0].text));
         sels[i].parentNode.insertBefore(trigger, sels[i]);
         var replaceUL = document.createElement('ul');
         for (var j = 0; j < sels[i].getElementsByTagName('option').length; j++) {
            var newli = document.createElement('li');
            var newa = document.createElement('a');
            newli.v = sels[i].getElementsByTagName('option')[j].value;
            newli.elm = hiddenfield;
            newli.istrigger = trigger;
            newa.href = '#';
            newa.appendChild(document.createTextNode(
               sels[i].getElementsByTagName('option')[j].text));
            newli.onclick = function() {
               this.elm.value = this.v;
               ts_swapclass(this.istrigger, ts_triggeron, ts_triggeroff);
               ts_swapclass(this.parentNode, ts_dropdownopen, ts_dropdownclosed)
               this.istrigger.firstChild.nodeValue = this.firstChild.firstChild.nodeValue;
               return false;
            }
            newli.appendChild(newa);
            replaceUL.appendChild(newli);
         }
         ts_addclass(replaceUL, ts_dropdownclosed);
         var div = document.createElement('div');
         div.appendChild(replaceUL);
         ts_addclass(div, ts_boxclass);
         sels[i].parentNode.insertBefore(div, sels[i])
         toreplace[count] = sels[i];
         count++;
      }
   }

   /*
   	Turn all ULs with the class defined above into dropdown navigations
   */

   var uls = document.getElementsByTagName('ul');
   for (var i = 0; i < uls.length; i++) {
      if (ts_check(uls[i], ts_listclass)) {
         var newform = document.createElement('form');
         var newselect = document.createElement('select');
         for (j = 0; j < uls[i].getElementsByTagName('a').length; j++) {
            var newopt = document.createElement('option');
            newopt.value = uls[i].getElementsByTagName('a')[j].href;
            newopt.appendChild(document.createTextNode(uls[i].getElementsByTagName('a')[j].innerHTML));
            newselect.appendChild(newopt);
         }
         newselect.onchange = function() {
            window.location = this.options[this.selectedIndex].value;
         }
         newform.appendChild(newselect);
         uls[i].parentNode.insertBefore(newform, uls[i]);
         toreplace[count] = uls[i];
         count++;
      }
   }
   for (i = 0; i < count; i++) {
      toreplace[i].parentNode.removeChild(toreplace[i]);
   }

   function ts_check(o, c) {
      return new RegExp('\\b' + c + '\\b').test(o.className);
   }

   function ts_swapclass(o, c1, c2) {
      var cn = o.className
      o.className = !ts_check(o, c1) ? cn.replace(c2, c1) : cn.replace(c1, c2);
   }

   function ts_addclass(o, c) {
      if (!ts_check(o, c)) { o.className += o.className == '' ? c : ' ' + c; }
   }
}

window.onload = function() {
   tamingselect();
   // add more functions if necessary
}

/////Select-castom2///////////////////////////////////////////////////////////////////////////////////////////////////////////////