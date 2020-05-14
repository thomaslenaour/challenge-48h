# Endpoints de l'API

## /api/companies

- ✅ **GET** /api/companies => Liste des entreprises
- ✅ **POST** /api/companies/register => Créer une compagny (inscription)
- ✅ **PATCH** /api/companies/:companyId => Modifier compagny
- ✅ **POST** /api/companies/login => Connexion
- ✅ **GET** /api/companies/:companyId => Récupérer les infos en fonction de l'ID
- **DELETE** /api/companies/:companyId => Supprimer une entreprise

## /api/reservations

- **GET** /api/reservations/:reservationId => Récuperer les infos d'une reservation
- **GET** /api/reservations/company/:companyId => Récupérer toutes les réservations d'une entreprise
- **POST** /api/reservations/:companyId => Créer une réservation associée à l'ID d'une company
- **DELETE** /api/reservations/:reservationId => Supprimer une réservation
