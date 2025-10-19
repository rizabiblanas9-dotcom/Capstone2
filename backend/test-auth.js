// Simple test script for authentication endpoints
// Run with: node test-auth.js

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:5000/api/auth';

// Test data
const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    birthdate: '1990-01-01',
    age: 34,
    contact: '1234567890',
    address: '123 Test St, Test City',
    medicalHistory: 'No known allergies',
    role: 'patient'
};

async function testAuth() {
    console.log('🧪 Testing Authentication System...\n');

    try {
        // Test 1: User Registration
        console.log('1. Testing User Registration...');
        const registerResponse = await fetch(`${BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(testUser),
        });
        
        const registerData = await registerResponse.json();
        console.log('Registration Response:', registerData);
        
        if (registerData.success) {
            console.log('✅ Registration successful\n');
        } else {
            console.log('❌ Registration failed\n');
        }

        // Test 2: User Login
        console.log('2. Testing User Login...');
        const loginResponse = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: testUser.email,
                password: testUser.password
            }),
        });
        
        const loginData = await loginResponse.json();
        console.log('Login Response:', loginData);
        
        if (loginData.success) {
            console.log('✅ Login successful');
            const token = loginData.data.token;
            
            // Test 3: Get Profile
            console.log('\n3. Testing Get Profile...');
            const profileResponse = await fetch(`${BASE_URL}/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            
            const profileData = await profileResponse.json();
            console.log('Profile Response:', profileData);
            
            if (profileData.success) {
                console.log('✅ Profile retrieval successful\n');
            } else {
                console.log('❌ Profile retrieval failed\n');
            }
            
        } else {
            console.log('❌ Login failed\n');
        }

    } catch (error) {
        console.error('❌ Test failed with error:', error.message);
    }
}

// Run tests
testAuth();
