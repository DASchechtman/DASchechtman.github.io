// this will create a firebase object so I can send and retrieve data from firebase
var server =  new Firebase('https://das-contact-list.firebaseio.com/');

// this will be used to make a copy of the firebase object into the program so the program can use it and add the information to the DOM
var local_object = new Object();

// this will determine if the program needs to initialize or reinit
var init_list = true;

var stay = true;
 
var do_once = true;

// this variable will be used as an id for a button tag that is added with every user
// entry
var id = 0;

var buttons = [];

// this function will be passed to $(document).ready() when everything is set up
function main(){
    
    // triggers the action when user hits the submit button
    $('#sub').click(onClick);
    
    // clears the contact list when the user hit clear
    $('#clear').click(function(){
        server.set(null);
        $('#display').empty();
        id = 0;
    });
    
    // this will make sure that the user will not have to hit the enter button to see the 
    // contacts already entered into the program at the start of the program
    if(init_list){
        server.orderByChild('first_name').on('child_added', displayContactInfo);
        init_list = false;
    }
    removeElement();
    
}

// this function will process the contact information so it can be put on the screen later
function displayContactInfo(snapshot, pn){
    // allows the program to use information from the firebase server
    var contact_val = snapshot.val();
    var contact_key = snapshot.key();
    
    // stores contact information so it can be manipulated later in the program
    if(local_object[contact_key] === undefined){
        
        local_object[contact_key] = {
            fName: contact_val.first_name+' ',
            lName: contact_val.last_name+' ',
            address: contact_val.address+' ',
            cell: contact_val.cell_number,
            b1: contact_val.b1,
            isOnDom: false,
        };
        
            
        // this is what displays the contact info onto the screen
        putOnScreen(contact_key, pn);
    }
}

// this function will be called whenever the user clicks the submit button
function onClick(){
    
    // the variables below will temperarily hold user input until it can be uploaded to firebase
    var user_first_name = $('#first-name').val();
    var user_last_name = $('#last-name').val();
    var user_address = $('#address').val();
    var user_cell_num = $('#cell-number').val();
    
    // adds a delete and remove button for each contact
    var user_b1 = '<button type = "button" id = "del" name = "del">Delete</button>';
    var user_b2 = '<button type = "button" class = "btn btn-primary dropdown-toggle" data-toggle = "dropdown" id = "edit"> Edit <span class = "caret"></span></button>';
    
    // this will be used to only allow the program to upload something to the firebase server
    // only if the information is valid
    var run = true;
    
    var is_it_blank = [user_address, user_cell_num, user_first_name, user_first_name];
    
    // does the checkng
    for(var i = 0; i < 4; i++){
        if(is_it_blank[i] === ''){
            run = false;
            break;
        }
    }
    
    if(run){
        // uploads information to the firebase server
        server.push({first_name: user_first_name,
                last_name: user_last_name,
                address: user_address,
                cell_number:user_cell_num,
                b1: user_b1,
                    });
        id++;
    }
    
    // tells the program to look for these id's (which are the id's of the text box) and clears them
    $('#first-name').val('');
    $('#last-name').val('');
    $('#address').val('');
    $('#cell-number').val('');
    
    // adds contact information to the local fire base object in the program
    server.orderByChild('first_name').on('child_added', displayContactInfo);
    
    removeElement();
}

// this function will allow the program know when something has been deleted from the
// screen and remove it
function removeElement(){
    setTimeout(function(){
            for(var i = 0; i < buttons.length; i++){
                (function(j){
                    $('#'+buttons[j].id).click(function(){
                        if($('#'+buttons[j].id).attr('name') === 'del'){
                            server.child(buttons[j].Key).remove();
                            $('#'+buttons[j].Key).remove();
                        }
                    })
                })(i);
            }
        }, 2500);
}

// this function will put the contacts onto the screen
function putOnScreen(key, prev){
    
    // this variable will be used to append elemnts to the table display in the html file
    var add_to_display = $('#display');
    
    // will be used to add elements to the newly added table row
    // this variable is mainly here for readiblity reasons
    add_to_display.append('<tr id = '+key+'></tr>');
    
    
    
    // this variable is only for readiblity reasons
    var add_obj = local_object[key];
    
    
    // used to add elements to a table 
    var add_to_row = $('#'+key);
    
    // checks to see if this the first element in the firebase server and has not yet been put on the screen
    if(prev === null && !add_obj.isOnDom){
        
        // adds element to a specific table row
        add_to_row.append('<td id = a'+key+'>'+add_obj.fName+'</td>');
        add_to_row.append('<td id = b'+key+'>'+add_obj.lName+'</td>');
        add_to_row.append('<td id = c'+key+'>'+add_obj.address+'</td>');
        add_to_row.append('<td id = d'+key+'>'+add_obj.cell+'</td>');
        add_to_row.append('<td id = e'+key+'></td>');
        
        var add_el = $('#e'+key);
        add_el.append(add_obj.b1);
        
        // tells the program that the contact information is now already on the screen
        add_obj.isOnDom = true;
    }
    // if it's not the first element on the firebase server but still hasn't been put onto the screen yet 
    else{
        // gets the id name of the previous element
        var previous_row = $('#'+prev);
        
        // adds four new cells to the newly created row and puts in the information so it will be displayed on the
        // screen
        add_to_row.append('<td id = a'+key+'>'+add_obj.fName+'</td>');
        add_to_row.append('<td id = b'+key+'>'+add_obj.lName+'</td>');
        add_to_row.append('<td id = c'+key+'>'+add_obj.address+'</td>');
        add_to_row.append('<td id = d'+key+'>'+add_obj.cell+'</td>');
        add_to_row.append('<td id = e'+key+'></td>');
        
        var add_el = $('#e'+key);
        add_el.append(add_obj.b1);
                
        
        // places the new contact inforation in the right location on the table (going in alpabetical order)
        previous_row.after(add_to_row);
    }
    
    $('#del').attr('id', 'delete'+key);
    buttons[buttons.length] = {id: $('#delete'+key).attr('id'), Key: key};
}

$(document).ready(main);