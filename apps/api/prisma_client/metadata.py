from __future__ import annotations
# -*- coding: utf-8 -*-
# code generated by Prisma. DO NOT EDIT.
# fmt: off
# -- template metadata.py.jinja --


PRISMA_MODELS: set[str] = {
    'Tenant',
    'User',
    'Candidate',
    'Search',
    'Job',
    'Company',
}

RELATIONAL_FIELD_MAPPINGS: dict[str, dict[str, str]] = {
    'Tenant': {
        'users': 'User',
        'candidates': 'Candidate',
        'companies': 'Company',
        'searches': 'Search',
        'jobs': 'Job',
        'createdBy': 'User',
        'updatedBy': 'User',
    },
    'User': {
        'tenant': 'Tenant',
        'searches': 'Search',
        'candidates': 'Candidate',
        'jobs': 'Job',
        'createdBy': 'User',
        'updatedBy': 'User',
        'createdTenants': 'Tenant',
        'updatedTenants': 'Tenant',
        'createdUsers': 'User',
        'updatedUsers': 'User',
        'createdCandidates': 'Candidate',
        'updatedCandidates': 'Candidate',
        'createdSearches': 'Search',
        'updatedSearches': 'Search',
        'touchedCandidates': 'Candidate',
        'createdJobs': 'Job',
        'updatedJobs': 'Job',
    },
    'Candidate': {
        'tenant': 'Tenant',
        'user': 'User',
        'lastTouchedBy': 'User',
        'searches': 'Search',
        'companies': 'Company',
        'jobs': 'Job',
        'createdBy': 'User',
        'updatedBy': 'User',
    },
    'Search': {
        'user': 'User',
        'tenant': 'Tenant',
        'candidates': 'Candidate',
        'createdBy': 'User',
        'updatedBy': 'User',
    },
    'Job': {
        'tenant': 'Tenant',
        'user': 'User',
        'company': 'Company',
        'candidates': 'Candidate',
        'createdBy': 'User',
        'updatedBy': 'User',
    },
    'Company': {
        'tenant': 'Tenant',
        'jobs': 'Job',
        'candidates': 'Candidate',
    },
}

# fmt: on