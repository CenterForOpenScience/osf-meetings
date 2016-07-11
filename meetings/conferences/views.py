from django.http import Http404
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response

from conferences.models import Conference
from conferences.serializers import ConferenceSerializer

from guardian.shortcuts import assign_perm

from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator




# List of conferences
class ConferenceList(ListCreateAPIView):
    resource_name = 'conferences'

    queryset = Conference.objects.all()
    serializer_class = ConferenceSerializer

    # @method_decorator(login_required)
    def post (self, request, *args, **kwargs):
        r = super(ConferenceList, self).post(request, args, kwargs)
        conference = Conference.objects.get(id=request.data['id'])
        #assign_perm('conferences.change_conference', self.request.user, conference)
        assign_perm('conferences.delete_conference', self.request.user, conference)
        return r

    def delete (self, request, format=None):
        conference = Conference.objects.get(id=request.data['id'])
        print(self.request.user.has_perm('delete_conference', conference))
        print('delete!')
        return super(ConferenceList, self).post(request, args, kwargs)



# Detail of a conference
class ConferenceDetail(APIView):
    resource_name = 'conference'

    def get_object(self, pk):
        try:
            return Conference.objects.get(pk=pk)
        except Conference.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        conference = self.get_object(pk)
        serializer = ConferenceSerializer(conference)
        return Response(serializer.data)
