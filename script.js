document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
        alert('As senhas não coincidem.');
        return;
    }

    const userData = {
        nome: name,
        email: email,
        senha: password
    };

    try {
        const response = await fetch('http://localhost:3000/cadastro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Usuário cadastrado com sucesso!');
        } else {
            alert(`Erro: ${data.erro}`);
        }
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        alert('Erro ao cadastrar. Tente novamente.');
    }
});
