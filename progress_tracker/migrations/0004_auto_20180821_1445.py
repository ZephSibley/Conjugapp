# Generated by Django 2.1 on 2018-08-21 13:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('progress_tracker', '0003_auto_20180813_1313'),
    ]

    operations = [
        migrations.AlterField(
            model_name='max',
            name='date',
            field=models.DateField(verbose_name='date performed'),
        ),
    ]
