from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response

from submissions.serializers import SubmissionSerializer
from submissions.models import Submission
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator



# List of submissions
class SubmissionList(ListCreateAPIView):
    serializer_class = SubmissionSerializer
    resource_name = 'submission'
    encoding = 'utf-8'
    queryset= Submission.objects.all()

    def get(self, request, conference_id=None, format=None):
        conferenceSubmissions = Submission.objects.filter(conference_id=conference_id)
        submissionsSerializer = SubmissionSerializer(conferenceSubmissions, context={'request': request}, many=True)
        return Response(submissionsSerializer.data)

    @method_decorator(login_required)
    def post(self, request, conference_id=None, format=None):
        print("helloworld")
        serializer = SubmissionSerializer(data=request.data)
        contributors = [request.user.id]

        if serializer.is_valid():
            serializer.save(contributors=contributors)
            return Response(serializer.data)

        return Response(serializer.errors)


# Detail of a submission
class SubmissionDetail(APIView):
    resource_name = 'submission'
    serializer_class = SubmissionSerializer

    def get(self, request, conference_id=None, submission_id=None , format=None):
        conferenceSubmission = Submission.objects.get(pk=submission_id)
        submissionsSerializer = SubmissionSerializer(conferenceSubmission, context={'request': request}, many=False)
        return Response(submissionsSerializer.data)
