from django.urls import path

from app.views import authentication
from app.views.login import CustomTokenObtainPairView
from app.views.admin import AdminView
from app.views.users import RegisterView, ListUsersView
from app.views.dpi import AddDPIView, ListDPIsView
from app.views.soins import AddSoinView, ListSoinsView
from app.views.dpi import AddDPIView
from app.views.soins import AddSoinView
from app.views import DiagnosticControler, ConsultationControler, OrdananceControler, ExamenCompControler, Compte_renduControler, CertificatMedicalControler
from app.views.users import *
from app.views.dpi import *
from app.views.soins import *
from app.views.pharmacien import *

urlpatterns = [
    path('POST/', authentication.index_POST, name='index_POST'),
    path('GET/', authentication.index_GET, name='index_GET'),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('SignUp/', authentication.SignUp, name='SignUp'),
    path('token_test/', authentication.token_test, name='token_test'),
    path('users/add/', RegisterView.as_view(), name="register_view"),
    path('dpi/add/', AddDPIView.as_view(), name="add_dpi_view"),
    path('soins/add/', AddSoinView.as_view(), name="add_soins"),
    path('soins/', ListSoinsView.as_view(), name="list_soins"),
    path('users/', ListUsersView.as_view(), name="list_users"),
    path('dpi/', ListDPIsView.as_view(), name="list_dpis"),
    path('soins/add/', AddSoinView.as_view(), name="add_soins"),
    path('users/add', RegisterView.as_view(), name="register_view"),
    path('create_diagnostic/', DiagnosticControler.crea_Diagnostic , name="create_diagnostic"),
    path('create_consultation/', ConsultationControler.crea_Consultation , name="create_consultation"),
    path('create_ordanance/', OrdananceControler.crea_ordanance , name="create_ordanance"),
    path('add_diagnostic/', DiagnosticControler.ajout_diagnostic , name="add_diagnostic"),
    path('add_medicament/', OrdananceControler.ajout_medicament , name="add_medicament"),
    path('add_resume/', ConsultationControler.ajout_resume , name="add_resume"),
    path('add_resultat_bio/', ExamenCompControler.ajout_Resultat_Biologique , name="add_resultat_bio"),
    path('add_bilan_bio/', ExamenCompControler.ajout_Bilan_Biologique , name="add_bilan_bio"),
    path('add_bilan_radio/', ExamenCompControler.ajout_bilan_radiologique , name="add_bilan_radio"),
    path('add_examen_comp/', ExamenCompControler.ajout_ExamenComplementaire , name="add_examen_comp"),
    path('add_examen_radio/', ExamenCompControler.ajout_examen_radiologique, name="bilan_bio"),
    path('add_resultat_radio/', ExamenCompControler.ajout_resultat_radiologique, name="resultat_radio"),
    path('add_compte_rendu/', Compte_renduControler.crea_compte_rendu, name="add_compte_rendu"),
    path('consultations/add_examen_consultation/', ConsultationControler.ajout_examen_consultation, name="add_examen_consultation"),
    path('create_certificat/', CertificatMedicalControler.crea_certificat, name="create_certificat_medical"),
    path('examen_comp/', ExamenCompControler.ExamenComplementaireListView.as_view(), name="examen_comp"),
    path('examen_comp/delete/', ExamenCompControler.ExamenComplementaireListView.as_view(), name="examen_comp"),
    path('examen_comp/modify/', ExamenCompControler.ExamenComplementaireListView.as_view(), name="examen_comp"),
    path('diagnostics/', DiagnosticControler.DiagnosticListView.as_view(), name="diagnostics"),
    path('diagnostics/delete/', DiagnosticControler.DiagnosticListView.as_view(), name="diagnostics"),
    path('diagnostics/modify/', DiagnosticControler.DiagnosticListView.as_view(), name="diagnostics"),
    path('consultations/', ConsultationControler.ConsultationListView.as_view(), name="consultations"),
    path('consultations/delete/', ConsultationControler.ConsultationListView.as_view(), name="consultations"),
    path('consultations/modify/', ConsultationControler.ConsultationListView.as_view(), name="consultations"),
    path('resumes/', ConsultationControler.ResumeListView.as_view(), name="resumes"),
    path('resumes/delete', ConsultationControler.ResumeListView.as_view(), name="resumes"),
    path('resumes/modify', ConsultationControler.ResumeListView.as_view(), name="resumes"),
    path('ordanances/', OrdananceControler.OrdananceListView.as_view(), name="ordanances"),
    path('ordanances/delete/', OrdananceControler.OrdananceListView.as_view(), name="ordanances"),
    path('ordanances/modify/', OrdananceControler.OrdananceListView.as_view(), name="ordanances"),
    path('medicaments/', OrdananceControler.MedicamentListView.as_view(), name="medicaments"),
    path('medicaments/delete/', OrdananceControler.MedicamentListView.as_view(), name="medicaments"),
    path('medicaments/modify/', OrdananceControler.MedicamentListView.as_view(), name="medicaments"),
    path('bilan_bio/', ExamenCompControler.BilanBiologiqueListView.as_view(), name="bilan_bio"),
    path('bilan_bio/delete/', ExamenCompControler.BilanBiologiqueListView.as_view(), name="bilan_bio"),
    path('bilan_bio/modify/', ExamenCompControler.BilanBiologiqueListView.as_view(), name="bilan_bio"),
    path('bilan_radio/', ExamenCompControler.BilanRadiologiqueListView.as_view(), name="bilan_radio"),
    path('bilan_radio/delete/', ExamenCompControler.BilanRadiologiqueListView.as_view(), name="bilan_radio"),
    path('bilan_radio/modify/', ExamenCompControler.BilanRadiologiqueListView.as_view(), name="bilan_radio"),
    path('resultats_bio/', ExamenCompControler.ResultatBiologiqueListView.as_view(), name="resultats_bio"),
    path('resultats_bio/delete/', ExamenCompControler.ResultatBiologiqueListView.as_view(), name="resultats_bio"),
    path('resultats_bio/modify/', ExamenCompControler.ResultatBiologiqueListView.as_view(), name="resultats_bio"),
    path('resultats_radio/', ExamenCompControler.ResultatRadiologiqueListView.as_view(), name="resultats_radio"),
    path('resultats_radio/delete/', ExamenCompControler.ResultatRadiologiqueListView.as_view(), name="resultats_radio"),
    path('resultats_radio/modify/', ExamenCompControler.ResultatRadiologiqueListView.as_view(), name="resultats_radio"),
    path('examens_radio/', ExamenCompControler.ExamenRadiologiqueListView.as_view(), name="examens_radio"),
    path('examens_radio/delete/', ExamenCompControler.ExamenRadiologiqueListView.as_view(), name="examens_radio"),
    path('examens_radio/modify/', ExamenCompControler.ExamenRadiologiqueListView.as_view(), name="examens_radio"),
    path('examen_consultation/', ConsultationControler.ExamenConsultationListView.as_view(), name="examen_consultation"),
    path('examen_consultation/delete/', ConsultationControler.ExamenConsultationListView.as_view(), name="examen_consultation"),
    path('examen_consultation/modify/', ConsultationControler.ExamenConsultationListView.as_view(), name="examen_consultation"),
    path('compte_rendu/', Compte_renduControler.Compte_RenduListView.as_view(), name="compte_rendu"),
    path('compte_rendu/delete/', Compte_renduControler.Compte_RenduListView.as_view(), name="compte_rendu"),
    path('compte_rendu/modify/', Compte_renduControler.Compte_RenduListView.as_view(), name="compte_rendu"),
    path('certificat/', CertificatMedicalControler.CertificatMedicalListView.as_view(), name="certificat"),
    path('certificat/delete/', CertificatMedicalControler.CertificatMedicalListView.as_view(), name="certificat"),
    path('certificat/modify/', CertificatMedicalControler.CertificatMedicalListView.as_view(), name="certificat"),
    path('users/<int:pk>/', GetUserView.as_view(), name="get_user"),
    path('dpi/<int:pk>/', GetDPIView.as_view(), name="get_dpi"),
    path('soins/<int:pk>/', GetSoinView.as_view(), name="get_soin"),
    path('dpi/search/', SearchDPIView.as_view(), name="search_dpi"),
    path('ordonnance/validate/', OrdonnanceValidationView.as_view(), name="validate_ord"),
]