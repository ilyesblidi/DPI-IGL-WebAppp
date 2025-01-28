from rest_framework.permissions import BasePermission

class isAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'
    
class isPatient(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'patient'
    
class isMedecin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'medecin'
    
class isInfirmier(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'infirmier'
    
class isRadioloque(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'radiologue'
    
class isLaborantin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'laborantin'

class isPharmacien(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'pharmacien'