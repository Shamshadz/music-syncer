from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer, GetRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

# Create your views here.
@method_decorator(csrf_exempt, name='dispatch')
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self,request,format=None):

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            # try:
            if not self.request.session.exists(serializer.data.get('host')):
                self.request.session.create()
                session_key = self.request.session.session_key      
            # except:
            #     pass

            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = serializer.data.get('host').replace('#','')

            if(host==None):
                host = session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause','votes_to_skip'])
            else:
                room = Room(host=host,guest_can_pause=guest_can_pause,votes_to_skip=votes_to_skip)
                room.save()

            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)


class GetRoom(APIView):
    serializer_class = GetRoomSerializer
    lookup_url_kwarg = 'code'

    def post(self,request,format=None):

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            host = serializer.data.get('host').replace('#','')

        # code = self.request.GET.get(self.lookup_url_kwarg)
        code = serializer.data.get('code').replace('#','')

        if code != None:
            room = Room.objects.filter(code = code)
            if len(room) > 0:
                data = RoomSerializer(room[0]).data
                # data['is_host'] = self.request.session.session_key == room[0].host
                data['is_host'] = host == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Room Not Found':'Invalid Room Code'},status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Code Parameter Not Found in Request'}, status=status.HTTP_400_BAD_REQUEST)

class JoinRoom(APIView):
    lookup_url_kwarg = 'code'
    serializer_class = GetRoomSerializer


    def post(self,request,format=None):

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            host = serializer.data.get('host').replace('#','')
            code = serializer.data.get('code').replace('#','')
        # if not self.request.session.exists():
        #     self.request.session.create()

        # code = request.data.get(self.lookup_url_kwarg)
        if code != None:
            room_result = Room.objects.filter(code=code)
            if len(room_result) > 0:
                room = room_result[0]
                self.request.session['room_code'] = code
                return Response({'message': 'Room Joined!'}, status=status.HTTP_200_OK)

            return Response({'Bad Request': 'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Bad Request': 'Invalid post data, did not find a code key'}, status=status.HTTP_400_BAD_REQUEST)