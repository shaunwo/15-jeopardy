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
const categories = [];
const categoryIDs = [];

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */
 async function getCategoryIds() {
   
    const response = await axios({
        url: `http://jservice.io/api/categories?count=20`,
        method: "GET",
    });

    // I found the sampleSize code on stackoverflow.com
    NUM_CATEGORIES = _.sampleSize(response.data, [n = 6]);

    for (let num of NUM_CATEGORIES) {
        let categoryID = num.id;
        categoryIDs.push(categoryID); 
    }

    for (let catId of categoryIDs) {
        getCategory(catId); 
    }
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
    console.log(category.title);
    categories.push({
        title: category.title,
        id: category.id,
        clues: [ category.clues ],
    });
    return categories;
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
    console.log(categories);
    //console.log(category[0].title);
    console.log(categories.length);
    // for (let header of categories.data) {
    //     console.log(header.title);
    //     $("body").append("<th>${header.title}</th>");
    // }
    $("body").append("</tr>");
    $("body").append("</thead>");
   
    $("body").append("<tbody>");

    // rows of table
    $("body").append("<tr>");
    $("body").append("<td>row 1</td>");
    $("body").append("<td>row 2</td>");
    $("body").append("<td>row 3</td>");
    $("body").append("<td>row 4</td>");
    $("body").append("<td>row 5</td>");
    $("body").append("<td>row 6</td>");
    $("body").append("</tr>");

    $("body").append("</tbody>");

    $("body").append("</table>");
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
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
    const catIDs = getCategoryIds();
    getCategory(catIDs);
    //console.log(categories);
}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO

// MY CODE
setupAndStart();
fillTable();