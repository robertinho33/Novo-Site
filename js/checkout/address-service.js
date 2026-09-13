'use strict';

const CEP_API_BASE = 'https://viacep.com.br/ws';

async function fetchAddressByCep(cep) {
    const cleanCep = String(cep || '').replace(/\D/g, '');

    if (cleanCep.length !== 8) {
        throw new Error('CEP inválido.');
    }

    const response = await fetch(
        `${CEP_API_BASE}/${cleanCep}/json/`
    );

    if (!response.ok) {
        throw new Error('Não foi possível consultar o CEP.');
    }

    const data = await response.json();

    if (data.erro) {
        throw new Error('CEP não encontrado.');
    }

    return {
        cep: data.cep || '',
        street: data.logradouro || '',
        neighborhood: data.bairro || '',
        city: data.localidade || '',
        state: data.uf || ''
    };
}
