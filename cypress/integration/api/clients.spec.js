describe('Clients API CRUD Tests', () => {
    const baseUrl = 'http://localhost:5002/api';
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'; // Token fixo
  
    let clientId; // Para armazenar o ID do cliente criado
  
    it('Should create a new client', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/clients`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          phone: '123456789',
          address: {
            street: '123 Main St',
            city: 'Springfield',
            state: 'IL',
            postalCode: '62701',
            number: '10',
          },
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id');
        clientId = response.body.id; // Armazena o ID do cliente criado
      });
    });
  
    it('Should fetch all clients', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/clients`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
      });
    });
  
    it('Should fetch a client by ID', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/clients/${clientId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id', clientId);
      });
    });
  
    it('Should update a client', () => {
      cy.request({
        method: 'PUT',
        url: `${baseUrl}/clients/${clientId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {
          id: clientId,
          name: 'John Doe Updated',
          email: 'john.doe.updated@example.com',
          phone: '987654321',
          address: {
            street: '456 Elm St',
            city: 'Springfield',
            state: 'IL',
            postalCode: '62702',
            number: '20',
          },
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('name', 'John Doe Updated');
      });
    });
  
    it('Should delete a client', () => {
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/clients/${clientId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });