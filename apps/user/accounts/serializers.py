from django.contrib.auth.models import Group
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .validators import UpdateIsDisallow
from rest_framework.validators import UniqueValidator


class UserSerializer(serializers.ModelSerializer):
    groups = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    password = serializers.SlugField(
        write_only=True,
        validators=[
            UpdateIsDisallow('Changing this field is prohibited. Use password recovery functionality.')
        ]
    )
    email = serializers.EmailField(
        validators=[UpdateIsDisallow('Changing this field is prohibited.'), UniqueValidator(queryset=get_user_model().objects.all())]
    )

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = get_user_model()
        fields = ("id", "email", "password", "groups", "name", "surname", "avatar", "date_joined")


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ("url", "name")

