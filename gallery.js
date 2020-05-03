function populate_gallery() {
    d3.csv("database.csv").then(function(data) {
        let modalList = [];
        let itemList = [];
        data.forEach(function(d) {
            // let divisor = Math.round(data.length/3);
            // let remainder = data.length % 3;

            const filepath = d.filepath;
            const title = d.title;
            const dimensions = d.dims;
            const modal_id = d.modal_id;

            const triColumn = `
<div class="col-sm-4">
    <div class="gallery-placeholder" style="background-image: url(${filepath})" onclick="modalView('${modal_id}')">
        <div class="gallery-info">
            <div class="gallery-title">${title}</div>
            <div class="gallery-dims">${dimensions}</div>
        </div>
    </div>
</div>
`;

            const modal = `
<div class="gallery-modal invisible" 
     id="${modal_id}"
     style="background-image: url(${filepath})" 
     onclick="rmvModalView('${modal_id}')">
</div>
`;

            itemList.push(triColumn);
            modalList.push(modal);
        });

        let iterator = 0;
        let final = [];
        let listOfThrees = [];

        itemList.forEach(function(d) {
            listOfThrees.push(d);
            console.log(listOfThrees.length);
            if (listOfThrees.length === 3) {
                final.push(make_row(listOfThrees));
                listOfThrees = [];
            }
            else if (itemList.length === iterator) {
                final.push(make_row(listOfThrees));
            }
            iterator = iterator + 1;


        });

        console.log(final.join(' '));

        document.getElementById("modalContainer").innerHTML = modalList.join(' ');
        document.getElementById("gallery-container").innerHTML = final.join(' ');
    });


}

function make_row(columns) {
    return `<div class="row">${columns.join(' ')}</div>`;
}

function modalView(modalID) {
    document.getElementById('gallery-container').classList.remove('visible');
    document.getElementById(modalID).classList.remove('invisible');
    document.getElementById('gallery-container').classList.add('invisible');
    document.getElementById(modalID).classList.add('visible');
}

function rmvModalView(modalID) {
    document.getElementById('gallery-container').classList.remove('invisible');
    document.getElementById(modalID).classList.remove('visible');
    document.getElementById('gallery-container').classList.add('visible');
    document.getElementById(modalID).classList.add('invisible');
}