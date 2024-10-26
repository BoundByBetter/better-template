import React, { useEffect } from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { AuthProvider } from './AuthProvider';
import { Text } from 'react-native';
import { describe, expect, it, beforeEach } from '@jest/globals';
import { useState, useContext } from 'react';
import { User } from './User';
import { useAuth } from './useAuth';

jest.mock('react', () => {
  const React = jest.requireActual('react');
  return {
    ...React,
    useState: jest.fn().mockReturnValue(React.useState),
    useContext: jest.fn().mockReturnValue(React.useContext),
  };
});

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should return the current auth context', () => {
    const contextMock = {
      currentUser: { userId: 'user1' },
      setCurrentUser: jest.fn(),
      clearCurrentUser: jest.fn(),
    };
    (useContext as jest.Mock).mockReturnValue(contextMock);
    const target = useAuth();
    expect(target).toEqual(contextMock);
  });
  it('should throw an error if useAuth is not used within an AuthProvider', () => {
    (useContext as jest.Mock).mockReturnValue(undefined);
    expect(() => useAuth()).toThrow(
      'useAuth must be used within an AuthProvider',
    );
  });
});
