# Generated by Django 2.2.6 on 2019-11-04 03:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('notes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='note',
            name='type',
            field=models.CharField(choices=[('home', 'home'), ('work', 'work'), ('other', 'other')], default='work', max_length=100),
        ),
    ]
