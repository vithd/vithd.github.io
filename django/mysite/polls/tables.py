import json
import django_tables2 as tables

from django.urls import reverse

from .models import Question


class QuestionTable(tables.Table):
    class Meta:
        model = Question

        # Inline-editable
        editable_fields = (
            'question_text',
            'pub_date',
            'textarea',
            'select',
            'date_field'
        )

        # Inline-editable attributes
        attrs = {
            'class': 'table table-editable',
            'data-url': 'edit'
        }
        row_attrs = {
            'data-id': lambda record: record.pk
        }

        # Auto define field type attrs
        field_types = {}

        for field in model._meta.fields:
            print(field.name)

            if field.name not in editable_fields:
                continue

            # Default type
            field_types[field.name] = 'text'

            if (field.get_internal_type() == 'DateTimeField'):
                field_types[field.name] = 'datetime'

            if (field.get_internal_type() == 'TextField'):
                field_types[field.name] = 'textarea'

            if (field.get_internal_type() == 'DateField'):
                field_types[field.name] = 'date'

            if (field.choices):
                field_types[field.name] = 'select'

                source = []
                for choice in field.choices:
                    source.append({'value': choice[0], 'text': choice[1]})

                attrs['data-%s-choices' %
                        field.name] = json.dumps(source)

                row_attrs['data-%s-value' %
                        field.name] = lambda record, field[name]=field_name: record[field_name]

                

        attrs['data-type'] = json.dumps(field_types)

