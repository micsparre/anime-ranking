# Generated by Django 3.2.21 on 2023-09-06 21:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('animeranking', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Title',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
    ]
