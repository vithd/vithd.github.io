// $.fn.editable.defaults.mode = 'inline';
console.log('RUN DEVIL RUN!');

$(document).ready(function() {
    ediTable()
});

function ediTable() {
    var table = $('.table-editable')
    var td_class = 'td-editable'
    var edited_color = 'rgb(248, 253, 229)'
    var dot_td_class = '.' + td_class
    var csrfmiddlewaretoken = getCookie('csrftoken');
    var FIELD_TYPES = table.data('type')
    var EDIT_URL = table.data('url')

    if (table.length) {

        table.before(`
            <button class="btn btn-default btn-toggle-editable">
                <i class="icon-edit"></i> 
                <span>Enable editing</span>
            </button>

            <button class="btn btn-primary btn-save-editable" style="display:none" disabled>
                <i class="icon-ok icon-white"></i> 
                <span>Save</span>
            </button>`)

        var btnToggle = $('.btn-toggle-editable')
        var btnSave = $('.btn-save-editable')

        btnToggle.click(function () {
            var text = $(this).children('span')

            if (text.text() == 'Enable editing') {
                TABLE_DATA = {}
                text.text('Disable editing')
                btnSave.show()
            } else {
                // Reset edited value
                table.find('.edited').each(function() {
                    $(this).children('div')
                    .editable('setValue', $(this).data('orginal'))

                    $(this).children('div').css('background-color', '')
                    $(this).removeClass('edited')
                })
                
                btnSave.prop('disabled', true)
                text.text('Enable editing')
                btnSave.hide()
            }

            table.find(dot_td_class).editable('toggleDisabled')
        })

        btnSave.click(function() {
            $.post(EDIT_URL, {
                csrfmiddlewaretoken,
                updateFields: JSON.stringify(TABLE_DATA)
            }, (response) => {
                btnToggle.click() // No matter what response is, disable editing
                
                if (response == 'ok') {
                    // Update view
                    for (id in TABLE_DATA) {
                        table.find('tr').each(function() {
                            if ($(this).data('id') == id) {
                                for (key in TABLE_DATA[id]) {
                                    $(this).children('.' + key)
                                    .data('orginal', TABLE_DATA[id][key])

                                    $(this).children('.' + key)
                                    .children(dot_td_class)
                                    .editable('setValue', TABLE_DATA[id][key])
                                }
                            }
                        })
                    }
                } else {
                    alert(response)
                }
            })
        })


        table.find('td').each(function () {
            if ($(this).children().length === 0) {
                var name = $(this).attr('class')
                var row = $(this).parent()
                var that = this

                $(this).data('orginal', $(this).text())

                if (FIELD_TYPES[name]) {
                    var option = {
                        send: 'never',
                        disabled: true,
                        mode: 'inline',
                        pk: parseInt($(this).parent().data('id')),
                        url: (params) => {
                            var d = new $.Deferred()
                            TABLE_DATA[params.pk] ? 1 : TABLE_DATA[params.pk] = {}
                            TABLE_DATA[params.pk][params.name] = params.value;

                            $(that).children('div').css('background-color', edited_color)
                            $(that).addClass('edited')
                            btnSave.prop('disabled', false)
                            return d.resolve()
                        },
                        name
                    }

                    option.type = FIELD_TYPES[name]

                    if (option.type == 'select') {
                        option.source = table.data(name + '-choices')
                        option.value = row.data(name + '-value')
                    }

                    if (option.type == 'datetime') {
                        //option.viewformat = 'mm/dd/yyyy h:i p'
                    }

                    $(this).wrapInner('<div class="'+ td_class +'"></div>')
                    .children('div')
                    .editable(option)
                }
            }
        })
    }
}

// using jQuery
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}