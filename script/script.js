const getAllLessons = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/levels/all');
  const data = await response.json();
  data.data.forEach(item => {
    const divContainer = document.getElementById('div-container');
    const div = document.createElement('div');
    div.innerHTML = `
      <div>
        <button id="btn-${item.level_no}" 
                onclick="getAllLevels(${item.level_no})" 
                class="btn btn-all flex rounded-md hover:bg-violet-800 hover:text-white text-violet-800 bg-white border border-violet-800">
          <img src="assets/fa-book-open.png" alt="" class="m-1">
          Lesson-${item.level_no}
        </button>
      </div>
    `;
    divContainer.append(div);
  });
};

const DefaultText = () => {
  const learnSection = document.getElementById('learn');
  const div = document.createElement('div');
  div.innerHTML = `
    <div id='default-text' class="flex flex-col items-center bg-gray-100 p-10 gap-4">
      <span class="text-lg text-gray-500">আপনি এখনো কোনো Lesson সিলেক্ট করেননি।</span>
      <span class="text-4xl font-semibold">একটি Lesson Select করুন।</span>
    </div>`;
  learnSection.append(div);
};

const getAllLevels = async (id) => {
  //  Highlight the active button
  document.querySelectorAll('.btn-all').forEach(btn => {
    btn.classList.remove('bg-violet-800', 'text-white');
    btn.classList.add('text-violet-800', 'bg-white');
  });
  const activeBtn = document.getElementById(`btn-${id}`);
  if (activeBtn) {
    activeBtn.classList.add('bg-violet-800', 'text-white');
    activeBtn.classList.remove('text-violet-800', 'bg-white');
  }


// lessonCard.classList.add('bg-gray-100');
    const defaultText = document.getElementById('default-text');
    if (defaultText) {
      defaultText.innerHTML = '';
      defaultText.style.backgroundColor = 'white';
    }

  //  lesson logic
  if (id !== 2) {
    const lessonCard = document.getElementById('lesson-card');
    lessonCard.innerHTML = '';
    lessonCard.classList.remove('bg-gray-100');
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="bg-gray-200 flex justify-center items-center text-center">
        <p class="text-center text-4xl font-bold p-30">No Word Found!!</p>
      </div>`;
    defaultText.append(div);
    return;
  }

  const response = await fetch('https://openapi.programming-hero.com/api/level/5');
  const data = await response.json();
  const lessonCard = document.getElementById('lesson-card');
  lessonCard.innerHTML = '';
  data.data.forEach(item => {
    // console.log(item.id);
  lessonCard.classList.add('bg-gray-100');
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="bg-white py-5 flex flex-col border-white shadow-md text-lg poppins items-center rounded-xl gap-5">
        <p class="font-semibold text-2xl">${item.word}</p>
        <p>Meaning/Pronounciation</p>
        <p class="text-gray-500">${item.meaning}/${item.pronunciation}</p>
        <div class="flex w-full px-5 justify-between">
          <div>
            <button id="modal-btn-${item.id}" onclick="showModal(${item.id})"  class="btn"><i class="fa-solid fa-circle-info"></i></button>
          </div>
          <div>
            <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>
      </div>`;
    lessonCard.append(div);
  });
};
 const showModal = async (id) => {

    const response = await fetch (`https://openapi.programming-hero.com/api/word/${id}`);
    const data =await response .json();
    // console.log(data.data.synonyms);
  // modal
  const modalContainer = document.createElement('div');
  modalContainer.innerHTML = `
    <dialog id="my_modal_${id}" class="modal">
      <div class="modal-box">
        <h3 class="text-xl font-bold">Word : ${data.data.word}</h3>
        <p class="py-4"><span class="font-bold">Meaning</span>: ${data.data.meaning}</p>
        <p class="py-4"><span class="font-bold">Pronounciation</span>: ${data.data.pronunciation}</p>
        <p class="py-4"><span class="font-bold">Synonyms</span>: ${data.data.synonyms[0]} / ${data.data.synonyms[1]} / ${data.data.synonyms[2]}</p>
        <p class="py-4"><span class="font-bold">Sentence</span>: ${data.data.sentence}</p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  `;


  document.body.appendChild(modalContainer);

  // Get the modal element
  const modal = document.getElementById(`my_modal_${id}`);

  // Show the modal
  modal.showModal();

  // Optional: remove modal from DOM when it closes
  modal.addEventListener('close', () => {
    modalContainer.remove();
  });
};

DefaultText();
getAllLessons();
