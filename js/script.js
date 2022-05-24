const getDataForm = () => {
   const isCheckboxOrRadio = type => ['checkbox', 'radio'].includes(type);

   const { form } = document.forms;

   const values = {};
   function retrieveFormValue(event) {
      event.preventDefault();

      const { elements } = form;

      for (let i = 0; i < elements.length; i++) {
         const formElement = elements[i];
         const { name } = formElement;

         if (name) {
            const { value, type, checked } = formElement;

            values[name] = isCheckboxOrRadio(type) ? checked : value;
         }

      }
      //console.log(values);

      const block = document.querySelector('.filmList');
      let name = 0;

      if (localStorage.getItem('name')) {
         name = localStorage.getItem('name');
      }
      name++;

      localStorage.setItem(`${name}`, JSON.stringify(values));

      localStorage.setItem('name', name);

      let genreOutput = genreLine(values);

      block.insertAdjacentHTML('beforeend', `
      <div class="filmCard" data-id="${name}">
         <div class="filmIMG">
            <img src="${values.Url}" alt="Обложка фильма">
            <img src="trash.png" alt="Delete film" class="recycle">
            <div class="review__wrapper">
              <p class="review"><a href="#popup3" class="review-link">ОТЗЫВЫ</a></p>
            </div>
         </div>
         <div class="filmINFO">
            <h3>${values.Name}</h3>
            <p>Жанр: ${genreOutput}</p> 
            <p>Страна: ${values.Country}</p>
            <p>${values.Age}+</p>
            <p>Дата выхода: ${values.Date}</p>   
         </div>
      </div>
      `);

      name = 0;

      document.forms.filmForm.reset();
      window.location.href = 'index.html';
   }

   form.addEventListener('submit', retrieveFormValue);

}
getDataForm();

function genreLine(values) {
   let genre = '';
   if (values.ActionMovie == true) genre += 'Боевик ';
   if (values.Comedy == true) genre += 'Комедия ';
   if (values.Detective == true) genre += 'Детектив ';
   if (values.Drama == true) genre += 'Драма ';
   if (values.Fantasy == true) genre += 'Фантастика ';
   if (values.History == true) genre += 'Исторический ';
   if (values.Horror == true) genre += 'Ужасы ';
   if (values.Thriller == true) genre += 'Триллер ';
   genre.trim();
   return genre;
}

const renderFilm = () => {
   const block = document.querySelector('.filmList');

   let nameNumber = localStorage.getItem('name');

   if (nameNumber) {
      for (let i = 1; i <= Number(nameNumber); i++) {
         if (Object.keys(localStorage).find(elem => elem == i) >= 0) {
            let elem = JSON.parse(localStorage.getItem(`${i}`));
            let genre = genreLine(elem);
            block.insertAdjacentHTML('beforeend', `
            <div class="filmCard" data-id="${i}">
               <div class="filmIMG">
                  <img src="${JSON.parse(localStorage.getItem(`${i}`)).Url}" alt="Обложка фильма">
                  <img src="trash.png" alt="Delete film" class="recycle"> 
                  <div class="review__wrapper">
                     <p class="review"><a href="#popup3" class="review-link">ОТЗЫВЫ</a></p>
                  </div>              
                  </div>
               <div class="filmINFO">
                  <h3>${JSON.parse(localStorage.getItem(`${i}`)).Name}</h3>
                  <p>Жанр: ${genre}</p> 
                  <p>Страна: ${JSON.parse(localStorage.getItem(`${i}`)).Country}</p>
                  <p>${JSON.parse(localStorage.getItem(`${i}`)).Age}+</p>
                  <p>Дата выхода: ${JSON.parse(localStorage.getItem(`${i}`)).Date}</p>   
               </div>
            </div>
         `)
         }
      }
   }
}
renderFilm();

// const closeModal = () => {
//    const popup = document.getElementById('popup3');
//    const modal = popup.querySelector('popup');

//    if (modal.style.opacity == '1') {
//       location.reload();
//    }
// }
// closeModal();

const popupOpenCloseAdd = () => {
   const popupArea = document.querySelectorAll('.popupReload');
   const popupClose = document.querySelectorAll('.popup_close');

   popupArea.forEach(popup => {
      popup.addEventListener('click', (event) => {
         document.forms.filmForm.reset();
         window.location.href = 'index.html';
      })

      // popup.addEventListener('click', (event) => {
      //    document.forms.filmReview.reset();
      //    window.location.href = 'index.html';
      // })

   })

   // popupClose.forEach(popup => {
   //    popup.addEventListener('click', (event) => {
   //       document.forms.filmForm.reset();
   //       window.location.href = 'index.html';
   //    })

   //    popup.addEventListener('click', (event) => {
   //       document.forms.filmReview.reset();
   //       window.location.href = 'index.html';
   //    })

   // })


}
popupOpenCloseAdd();

const sortGenre = () => {
   const isCheckboxOrRadio = type => ['checkbox', 'radio'].includes(type);

   const form = document.getElementById('formSelection');

   const values = {};
   function retrieveFormValue(event) {
      event.preventDefault();

      const { elements } = form;

      for (let i = 0; i < elements.length; i++) {
         const formElement = elements[i];
         const { name } = formElement;

         if (name) {
            const { value, type, checked } = formElement;

            values[name] = isCheckboxOrRadio(type) ? checked : value;
         }

      }
      console.log(values);

      const block = document.querySelector('.filmList');
      let nameNumber = localStorage.getItem('name');

      if (nameNumber) {
         block.innerHTML = '';
         for (let i = 1; i <= Number(nameNumber); i++) {
            if (Object.keys(localStorage).find(elem => elem == i) >= 0) {
               let elem = JSON.parse(localStorage.getItem(`${i}`));
               let genre = genreLine(elem);
               if (JSON.parse(localStorage.getItem(`${i}`)).Name.toLowerCase().includes(values.Name.toLowerCase()) || values.Name == '') {

                  if (JSON.parse(localStorage.getItem(`${i}`)).ActionMovie === values.ActionMovie || values.ActionMovie === false) {
                     if (JSON.parse(localStorage.getItem(`${i}`)).Comedy === values.Comedy || values.Comedy === false) {
                        if (JSON.parse(localStorage.getItem(`${i}`)).Detective === values.Detective || values.Detective === false) {
                           if (JSON.parse(localStorage.getItem(`${i}`)).Drama === values.Drama || values.Drama === false) {
                              if (JSON.parse(localStorage.getItem(`${i}`)).Fantasy === values.Fantasy || values.Fantasy === false) {
                                 if (JSON.parse(localStorage.getItem(`${i}`)).History === values.History || values.History === false) {
                                    if (JSON.parse(localStorage.getItem(`${i}`)).Horror === values.Horror || values.Horror === false) {
                                       if (JSON.parse(localStorage.getItem(`${i}`)).Thriller === values.Thriller || values.Thriller === false) {
                                          if (values.Country == '' || JSON.parse(localStorage.getItem(`${i}`)).Country.toLowerCase().includes(values.Country.toLowerCase())) {
                                             block.insertAdjacentHTML('beforeend', `
                                             <div class="filmCard" data-id="${i}">
                                                <div class="filmIMG">
                                                   <img src="${JSON.parse(localStorage.getItem(`${i}`)).Url}" alt="Обложка фильма">
                                                   <img src="trash.png" alt="Delete film" class="recycle">
                                                   <div class="review__wrapper">
                                                      <p class="review"><a href="#popup3" class="review-link">ОТЗЫВЫ</a></p>
                                                   </div>
                                                </div>
                                                <div class="filmINFO">
                                                   <h3>${JSON.parse(localStorage.getItem(`${i}`)).Name}</h3>
                                                   <p>Жанр: ${genre}</p> 
                                                   <p>Страна: ${JSON.parse(localStorage.getItem(`${i}`)).Country}</p>
                                                   <p>${JSON.parse(localStorage.getItem(`${i}`)).Age}+</p>
                                                   <p>Дата выхода: ${JSON.parse(localStorage.getItem(`${i}`)).Date}</p>   
                                                </div>
                                             </div>
                                             `)
                                          }
                                       }
                                    }
                                 }
                              }
                           }
                        }
                     }
                  }
               }
            }
         }
      }
   }

   form.addEventListener('submit', retrieveFormValue);
}
sortGenre();

const deleteFilm = () => {
   let filmCards = document.getElementsByClassName('filmCard');

   for (const film of filmCards) {
      film.addEventListener('click', (event) => {
         if (event.target.closest('.recycle')) {
            film.style.display = 'none';

            let id = film.dataset.id;
            if (id > 0) {
               localStorage.removeItem(id);
            }
         }
      })
      film.addEventListener('mouseover', (event) => {
         if (event.target.closest('.recycle')) {
            event.target.style.opacity = 1;
         }
      })
      film.addEventListener('mouseout', (event) => {
         if (event.target.closest('.recycle')) {
            event.target.style.opacity = '0';
         }
      })
   }
}
deleteFilm();

const review = () => {
   const filmCards = document.querySelectorAll('.filmCard');
   const modal = document.getElementById('popup3');
   let id = 0;

   filmCards.forEach(film => {
      film.addEventListener('click', (event) => {

         if (event.target.classList == 'review-link') { //делегирование
            console.log('click' + id);
            id = film.dataset.id; //достаём из датаАтрибута айди

            addReview(id);
            renderReview(id);

            // filmCards.forEach(elem => {
            //    elem.addEventListener('click', (event) => {
            //       addReview(id);
            //       renderReview(id);
            //    })
            // })

         }
      })
   })

}
review();

const addReview = (id) => {
   const form = document.getElementById('formReview');
   const input = form.querySelector('input');
   const field = document.querySelector('.text-field');
   let message = [];

   form.addEventListener('submit', (event) => {
      event.preventDefault();

      console.log(id);

      if (localStorage.getItem(`message ${id}`)) {
         message = JSON.parse(localStorage.getItem(`message ${id}`));
      }

      if (input.value) {
         message.push(input.value);
         localStorage.setItem(`message ${id}`, JSON.stringify(message));

         field.insertAdjacentHTML('beforeend', `
            <div class="message">
               <div class="message__text">${input.value}</div>
            </div>
         `)
      }

      console.log(JSON.parse(localStorage.getItem(`message ${id}`)));

      message = [];
      event.target.reset();
      location.reload();
      window.location.href = 'index.html';
   })
}

const renderReview = (id) => {
   const field = document.querySelector('.text-field');
   //console.log(id + ' render');
   field.innerHTML = '';
   if (localStorage.getItem(`message ${id}`)) {
      for (let i = 0; i < JSON.parse(localStorage.getItem(`message ${id}`)).length; i++) {
         field.insertAdjacentHTML('beforeend', `
         <div class="message">
             <div class="message__text">${JSON.parse(localStorage.getItem(`message ${id}`))[i]}</div>
         </div>
       `)
      }
   }
}
