const getAllLessons = async()=>{
    const response =await fetch('https://openapi.programming-hero.com/api/levels/all');
    const data = await response.json();
    data.data.forEach(item => {
        const divContainer = document.getElementById('div-container');
        console.log(item.level_no);
        const div = document.createElement('div');
        div.innerHTML=`<div>
                    <button onclick="getAllLevels (${item.level_no})" class="btn flex rounded-md hover:bg-violet-800  hover:text-white text-violet-800 border-violet-800"><img src="assets/fa-book-open.png" alt="" class="m-1">Lesson-${item.level_no}</button>
                </div>
        `
        divContainer.append(div);
    });
}

const DefaultText = ()=>{
    const learnSection = document.getElementById('learn');
    const div = document.createElement('div');
    div.innerHTML=`<div id='default-text' class="flex flex-col items-center bg-gray-100 p-10 gap-4">
                <span class="text-lg text-gray-500">আপনি এখনো কোনো Lesson সিলেক্ট করেননি।</span>
                <span class="text-4xl font-semibold">একটি Lesson Select করুন।</span>
            </div>`
     learnSection.append(div);
}

const getAllLevels = async (id) => {
    if(id !== 2){
        const lessonCard = document.getElementById('lesson-card');
        lessonCard.innerHTML='';
        const div = document.createElement('div');
        div.innerHTML=`<div class="text-center">
                <p class="text-4xl font-bold">Select a proper button!!</p>
            </div>`
            lessonCard.append(div);
        return;
    }
    const response = await fetch('https://openapi.programming-hero.com/api/level/5');
    const data = await response.json();
    console.log(data.data[0].meaning);
    const lessonCard = document.getElementById('lesson-card');
    lessonCard.innerHTML='';
    data.data.forEach(item => {
        // const lessonCard = document.getElementById('lesson-card');
    lessonCard.classList.add('bg-gray-100');
    console.log(item.meaning);
    const defaultText = document.getElementById('default-text');
    defaultText.innerHTML='';
    defaultText.style.backgroundColor='white';
    const div = document.createElement('div');
    div.innerHTML=`
                <div class="bg-white py-5 flex flex-col border-white shadow-md  text-lg poppins items-center rounded-xl gap-5">
                 <p class="font-semibold text-2xl">${item.word}</p>
                 <p>Meaning/Pronounciation</p>
                 <p class="text-gray-500">${item.meaning}/${item.pronunciation}</p>
                 <div class="flex w-full px-5 justify-between">
                    <div>
                        <button class="btn"><i class="fa-solid fa-circle-info"></i></button>
                    </div>
                    <div>
                        <button class="btn"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                 </div>
                </div>`
            lessonCard.append(div);
    })
}


DefaultText();

getAllLessons();