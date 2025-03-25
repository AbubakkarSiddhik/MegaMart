import React from 'react';

const TeamMemberCard = ({ name, role, image, description }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <img
        src={image}
        alt={name}
        className="w-32 h-32 mx-auto rounded-full mb-4"
      />
      <h3 className="text-xl font-bold">{name}</h3>
      <p className="text-gray-600 mb-2">{role}</p>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default TeamMemberCard;