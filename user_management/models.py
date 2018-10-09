from django.db import models
from django.contrib.auth.models import User
from allauth.account.models import EmailAddress
from allauth.socialaccount.models import SocialAccount
import hashlib

class UserProfile(models.Model):
    # Copy user data from auth into a model, on deletion from auth will delete from database
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE)

    def __unicode__(self):
        return "{}'s profile".format(self.user.username)

    # def __str__(self):
        #return self.user   #fix somehow

    class Meta:
        db_table = 'user_profile'

    def account_verified(self):
        # Checks if user is verified and returns email address if true
        if self.user.is_authenticated:
            result = EmailAddress.objects.filter(email=self.user.email)
            if len(result):
                return result[0].verified
        return False

    def profile_image_url(self):
        fb_uid = SocialAccount.objects.filter(user_id=self.user.id, provider='facebook')

        if len(fb_uid):
            return "http://graph.facebook.com/{}/picture?width=40&height=40".format(fb_uid[0].uid)
    
        return "http://www.gravatar.com/avatar/{}?s=40".format(hashlib.md5(self.user.email).hexdigest())
    # example: <img src="{{ request.user.profile.profile_image_url }}"/>

User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u)[0])

