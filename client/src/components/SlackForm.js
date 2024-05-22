import React, { useState } from 'react';
import "./SlackForm.css"
function SlackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5000/slack/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Form data sent to Slack successfully');
        setFormData({ name: '', email: '', message: '' });
      } else {
        console.error('Failed to send form data to Slack');
        alert('Failed to send form data to Slack');
      }
    } catch (error) {
      console.error('Error sending form data to Slack:', error);
      alert('Error sending form data to Slack');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 cont">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 form-2" >
        <h2 className="text-2xl font-bold mb-6 text-center">Send Message to Slack</h2>
        <form onSubmit={handleSubmit} >
          <div className="mb-4 size">
            <label className="block text-gray-700 size font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            />
          </div>
          <div className="mb-4 size">
            <label className="block text-gray-700 size text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            />
          </div>
          <div className="mb-4 size">
            <label className="block size text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32" 
            />
          </div>
          <div className=" size flex items-center justify-between">
            <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SlackForm;
