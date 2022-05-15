// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]
let categories = [];
let categoryIDs = [];

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */
 async function getCategoryIds() {
   
    const response = await axios({
        url: `https://jservice.io/api/categories?count=50`,
        method: "GET",
    });

    // I found the sampleSize code on stackoverflow.com
    NUM_CATEGORIES = _.sampleSize(response.data, [n = 6]);

    for (let num of NUM_CATEGORIES) {
        let categoryID = num.id;
        categoryIDs.push(categoryID); 
    }

    for (let catId of categoryIDs) {
        await getCategory(catId); 
    }
    $('#jeopardy').remove;
    fillTable();
    return categoryIDs;
}
//getCategoryIds();

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */
async function getCategory(catId) {
    
    // pulling details from the API by the catId
    const catResponse = await axios({
        url: `http://jservice.io/api/category?id=${catId}`,
        method: "GET",
    });
    let category = catResponse.data;
    //category.forEach(element => categories.push(element));
    //console.log(category.title);
    categories.push({
        title: category.title,
        id: category.id,
        clues: [ category.clues ],
    });
    //return categories;
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */
async function fillTable() {

    $("body").append("<table id=\"jeopardy\">");
    
    // headings of table
    $("body").append("<thead>");
    $("body").append("<tr>");
    for (let header of categories) {
        //console.log(header.title);
        $("body").append(`<th>${header.title}</th>`);
    }
    $("body").append("</tr>");
    $("body").append("</thead>");
   
    $("body").append("<tbody>");

    let prize = 200;
    
    // rows of table
    for (let i = 0; i < 5; i++) {
        $("body").append("<tr>");
        

        // clues for each category
        $("body").append(`<td><div class="card"><div class="reveal">$${prize}</div><div class="question" style="display: none;">${categories[0].clues[0][i].question}</div><div class="answer" style="display: none;">${categories[0].clues[0][i].answer}</div></div></td>`);
        $("body").append(`<td><div class="card"><div class="reveal">$${prize}</div><div class="question" style="display: none;">${categories[1].clues[0][i].question}</div><div class="answer" style="display: none;">${categories[1].clues[0][i].answer}</div></div></td>`);
        $("body").append(`<td><div class="card"><div class="reveal">$${prize}</div><div class="question" style="display: none;">${categories[2].clues[0][i].question}</div><div class="answer" style="display: none;">${categories[2].clues[0][i].answer}</div></div></td>`);
        $("body").append(`<td><div class="card"><div class="reveal">$${prize}</div><div class="question" style="display: none;">${categories[3].clues[0][i].question}</div><div class="answer" style="display: none;">${categories[3].clues[0][i].answer}</div></div></td>`);
        $("body").append(`<td><div class="card"><div class="reveal">$${prize}</div><div class="question" style="display: none;">${categories[4].clues[0][i].question}</div><div class="answer" style="display: none;">${categories[4].clues[0][i].answer}</div></div></td>`);
        $("body").append(`<td><div class="card"><div class="reveal">$${prize}</div><div class="question" style="display: none;">${categories[5].clues[0][i].question}</div><div class="answer" style="display: none;">${categories[5].clues[0][i].answer}</div></div></td>`);
 
        $("body").append("</tr>");    
        prize += 200;
    }
 
    $("body").append("</tbody>");

    $("body").append("</table>");

    // adding the restart button
    $("body").append(`<button id="reset">Reset Game</button>`);
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
    // I have functions below that are handling the flipping of the cards
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */
async function setupAndStart() {
    let catIDs = getCategoryIds();
    getCategory(catIDs);
}

/** On click of start / restart button, set up game. */
$("body").append(`<h1>Jeopardy!</h1>`);
$("body").append("<input type=\"submit\" id=\"startGame\" value=\"Start Game\">");


$(document).on("click", '#startGame', function() {
    //alert($('#jeopardy'));
    //$('#jeopardy').remove;
    setupAndStart();
    $("#startGame").hide();
});

$(document).on("click", '#reset', function() {
    categories = [];
    categoryIDs = [];
    $('#jeopardy').remove;
    setupAndStart();
});

/** On page load, add event handler for clicking clues */
$(document).on("click", '.reveal', function() {
    $(this).hide();
    $(this).next('.question').show();  
});
$(document).on("click", '.question', function() {
    $(this).hide();
    $(this).next('.answer').show();  
});
