from rest_framework import serializers

class UpdateIsDisallow:

    def __init__(self, message):
        self.message = message

    def __call__(self, value):
        if self.is_update:
            raise serializers.ValidationError(self.message)

    def set_context(self, serializer_field):
        self.is_update = serializer_field.parent.instance is not None
