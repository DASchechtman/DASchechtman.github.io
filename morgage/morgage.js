var year = 12;
var val = true;
var n;
var r;
var p;
var loan;
var monthly_payment;
var sum;
var loop = 0;
var table = [];
var main = function(){
    // makes sure that thinks will happen when I click on submit
    $('#Sub1').click(function(){
        // this will let me check which radio button is clicked
        var tbl = ['amount1', 'amount2', 'amount3'];
        
        // the for loop will do the checking
        for(var i = 0; i < 3; i++){
           var check = document.getElementById(tbl[i]);
            if(check.checked){
                n = check.value;
                break;
            }
        }
        
        // takes the data from the text boxes and converts them to numbers 
        // so they can be used in calculations
        r = parseFloat($('#interest-rate').val());
        p = parseInt($('#prinicple').val());
        var lowest = $('#lowerRange').val();
        var highest = $('#upperRange').val();

// this will be the variable to determine how many years the user will pay the loan
loan = p+'';

// the amount of years will now be converted into the equivilant amount of months
n *= 12;


// will convert from percent to decimal
r /= 100;

// will convert from anual to monthly rate
r /= 12;

// will hold the principle the use input

// will hold the info on the loan and will not be touched

// calculates the monthly payment
monthly_payment = (r/(1 - (Math.pow(1 + r, -n)))) * p;

monthly_payment = monthly_payment.toFixed(2);
monthly_payment = parseFloat(monthly_payment);

// will hold all the information on what the user has to pay that month and how much the still have
// to pay

// will store the total amout they paid
sum = 0;

for (var i=0; i < n; i++) {
    var interest = r * p;
    // this will calculate the principle paid per month
    var pric_pay = monthly_payment - interest;
    sum += monthly_payment;
    table[i] = [i, monthly_payment, interest.toFixed(2), pric_pay.toFixed(2), p.toFixed(2)]
    p -= pric_pay;
}

// this will make sure that I do not keep adding the same content to the DOM
// over and over again by empting the table if it already has content in it
if(loop > 0){
    $('#schedual').empty();
}
        
var i = lowest;
var h = highest;
        
// coverts lowest and highest into numbers if appropreate to be used
// to determine if the user wants to see everything between months x and y
if(i === ""){
    i = 0;
}else{
    i = parseInt(i);
    i -= 1;
}
if(h === ""){
    h = n;
}else{
    h = parseInt(h);
}
        
// checks to see if the user entered an invalid range
if(i < 1 ){
    i = 0;
}else if(i > 360){
    i = 359;
}
if(h < 1){
    h = 0;
}else if(h > n){
    h = n;
}
        
displaySummery(loop);
for(; i < h; i++){
    displayChart(loop, table[i][0], table[i][2], table[i][3], monthly_payment, table[i][4]);
}
        
// set equal to 12 months after everything is doen to make sure each time it is used 
// displayChart can make the right desisions
year = 12;
        
if(loop === 0){
    var title = $('#summ');
    title.append("<h1 class = summery-sheet>Summery</h1>");
    var title = $('#sched');
    title.append('<h1 class = summery-sheet>Schedule<h1>');
}
loop++;

                               });
}
$(document).ready(main);

// this function will make the a number look better
function formatNumber(x){
    // creates a temperary string to hold every character but the first one in x
    var temp = "";
    for(var i = 1; i < x.length; i++){
        temp += x[i];
    }
    
    // creates a new formated string
    var formatted = "";
    for(var i = temp.length-1; i >= 0; i--){
        formatted += temp[i];
        if(i%3 === 0 && i !== 0){
            formatted +=",";
        }
    }
    var start_digit = x[0]+"";
    if(temp.length%3 === 0){
        start_digit += ',';   
    }
    // returns the same number as in x by with ',' in the appropreate spots
    return "$"+start_digit+formatted;
}

// this function will either create or alter the payment chart
function displayChart(x, i, interest, prin_pay,MP,dif){
    // makes sure the right month is displayed
    i+=1;
    var chart_info = $("#schedual");
       if(i%12 === 0){
        // does the same thing as when i is not equal to year execpt instead of appending
        // the Month it appends the year.
        year += 12;
        chart_info.append("<tr class = 'summery-sheet'><td id ="+('one'+i)+"> Year: " + i/12 + "</td><td id = "+('two'+i)+"> Monthly payment: "+'$'+MP+"</td><td id = "+('three'+i)+"> Payment in interest: "+'$'+interest+"</td><td id = "+('four'+i)+"> Payment in principle: "+'$'+prin_pay+"</td><td id = "+('five'+i)+"> Principle not paid: "+"$"+dif+"</td></tr>");
        }
        else{
            // appends each row from table[][] onto the DOM
             chart_info.append("<tr class = 'summery-sheet'><td id ="+('one'+i)+"> Month: " + i + "</td><td id = "+('two'+i)+"> Monthly payment: "+'$'+MP+"</td><td id = "+('three'+i)+"> Payment in interest: "+'$'+interest+"</td><td id = "+('four'+i)+"> Payment in principle: "+'$'+prin_pay+"</td><td id = "+('five'+i)+"> Principle not paid: "+'$'+dif+"</td></tr>S");
        }
        
}

// this function will either create or alter the summery table
function displaySummery(x){
    var tb_info = $("#summery");
    if(x > 0){
        document.getElementById('1').innerHTML = "Loan Amount: " + formatNumber(loan);
        document.getElementById('2').innerHTML = "Interest rate: " + (r*12*100)+'%';
        document.getElementById('3').innerHTML = "Monthly payment: $ " + monthly_payment;
        document.getElementById('4').innerHTML = 'Total amount paid: '+'$'+ sum.toFixed(2);
        document.getElementById('5').innerHTML = "Interest paid: " + '$'+(sum-loan).toFixed(2);
        document.getElementById('6').innerHTML = "Payment ratio: " + (sum/loan).toFixed(3);
    }else{
        // adds a few classes after the user hits submit to make the 
        // tables displayed prettier
        document.getElementById('sum-table').className = 'jumbotron';
        document.getElementById('schd-table').className = 'jumbotron';
        document.getElementById('sb').className += ' table-background';
        document.getElementById('scb').className += ' table-background';
        
        tb_info.append("<tr><td class = 'summery-sheet' id = 1> Loan Amount: " + formatNumber(loan) +"</td></tr>");
        tb_info.append("<tr><td class = 'summery-sheet' id = 2> Interest rate: " + (r*12*100)+'%' + "</td></tr>");
        tb_info.append("<tr><td class = 'summery-sheet' id = 3> Monthly payment: " + "$" + monthly_payment + "</td></tr>");
        tb_info.append("<tr><td class = 'summery-sheet' id = 4> Total amount paid: " +'$'+sum.toFixed(2) + "</td></tr>");
        tb_info.append("<tr><td class = 'summery-sheet' id = 5> Interest paid: "+'$'+(sum-loan).toFixed(2) +"</td></tr>");
        tb_info.append("<tr><td class = 'summery-sheet' id = 6> Payment ratio: " +(sum/loan).toFixed(3) + "</td></tr>");
    }
}