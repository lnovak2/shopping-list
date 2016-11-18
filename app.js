var state = {
	items: []
};

var itemTemplate = (
	'<li>' +
	    '<span class="shopping-item"></span>' +
        '<div class="shopping-item-controls">' +
          '<button class="shopping-item-toggle">' +
            '<span class="button-label">check</span>' +
          '</button>' +
          '<button class="shopping-item-delete">' +
            '<span class="button-label">delete</span>' +
          '</button>' +
        '</div>' +
    '</li>'
);

function addItem(state, name){
	var item = {
		name: name,
		checked: false
	};
	state.items.push(item);
};

function renderItem(item, template, index){
	var listItem = $(template);
	listItem.find('.shopping-item').text(item.name);
	if(item.checked){
		listItem.find('.shopping-item').addClass('shopping-item__checked');
	}
	listItem.attr('itemIndex', index);
	return listItem;
};

function renderList(state, element, template){
	var listArray = state.items.map(function(item, index){
		return renderItem(item, template, index);
	});
	element.html(listArray);
};

function deleteItem(state, index){
	state.items.splice(index, 1);
};

function setCheck(state, index){
	if(state.items[index].checked){
		state.items[index].checked = false;
	} else{
		state.items[index].checked = true;
	}
};

$('#js-shopping-list-form').submit(function(event){
	event.preventDefault();
	var name = $('#shopping-list-entry').val();
	addItem(state, name);
	renderList(state, $('.shopping-list'), itemTemplate);
});

$('.shopping-list').on('click', '.shopping-item-toggle', function(event){
	var target = $(this).closest('li').attr('itemIndex');
	setCheck(state, target);
	renderList(state, $('.shopping-list'), itemTemplate);
});

$('.shopping-list').on('click', '.shopping-item-delete', function(event){
 	var target = $(this).closest('li').attr('itemIndex');
 	deleteItem(state, target);
 	renderList(state, $('.shopping-list'), itemTemplate);
});



