import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

export interface SpinWheelSegment {
  id: string;
  label: string;
  value: string;
  color: string;
  probability?: number; // Optional: for weighted segments
}

interface SpinWheelProps {
  segments: SpinWheelSegment[];
  onSpinComplete?: (segment: SpinWheelSegment) => void;
  isOpen: boolean;
  onClose: () => void;
}

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  position: relative;
  max-width: 90vw;
  width: 500px;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  &:hover {
    color: #333;
  }
`;

const WheelContainer = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
  margin: 2rem auto;
`;

const Wheel = styled.div<{ spinning: boolean; spinDuration: number; stopAngle: number }>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  transition: transform 0.3s ease;
  transform: ${props => `rotate(${props.stopAngle}deg)`};
  animation: ${props => props.spinning ? `${spin} ${props.spinDuration}s cubic-bezier(0.17, 0.67, 0.12, 0.99)` : 'none'};
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
`;

const Segment = styled.div<{ rotate: number; skewY: number; color: string }>`
  position: absolute;
  width: 50%;
  height: 50%;
  transform-origin: 100% 100%;
  transform: ${props => `rotate(${props.rotate}deg) skewY(${props.skewY}deg)`};
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: filter 0.3s ease;

  &:hover {
    filter: brightness(1.1);
  }
`;

const SpinButton = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #F2631F;
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(242, 99, 31, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translate(-50%, -50%) scale(1.1);
    background: #E55A1F;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const Pointer = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 40px;
  background: #F2631F;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  z-index: 5;
`;

const Title = styled.h2`
  color: #F2631F;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const SpinWheel: React.FC<SpinWheelProps> = ({ segments, onSpinComplete, isOpen, onClose }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [stopAngle, setStopAngle] = useState(0);
  const spinDuration = 4; // seconds

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    
    // Calculate random segment with probability weights
    const totalWeight = segments.reduce((sum, segment) => sum + (segment.probability || 1), 0);
    let random = Math.random() * totalWeight;
    let selectedIndex = 0;
    
    for (let i = 0; i < segments.length; i++) {
      random -= (segments[i].probability || 1);
      if (random <= 0) {
        selectedIndex = i;
        break;
      }
    }

    // Calculate final rotation
    const segmentAngle = 360 / segments.length;
    const baseAngle = selectedIndex * segmentAngle;
    const randomOffset = Math.random() * (segmentAngle * 0.8); // Random offset within segment
    const minSpins = 5; // Minimum number of full rotations
    const totalRotation = (minSpins * 360) + baseAngle + randomOffset;
    
    setStopAngle(totalRotation);

    // Handle spin completion
    setTimeout(() => {
      setIsSpinning(false);
      if (onSpinComplete) {
        onSpinComplete(segments[selectedIndex]);
      }
    }, spinDuration * 1000);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Spin & Win Amazing Offers! 🎉</Title>
        <WheelContainer>
          <Pointer />
          <Wheel spinning={isSpinning} spinDuration={spinDuration} stopAngle={stopAngle}>
            {segments.map((segment, index) => {
              const rotate = (index * 360) / segments.length;
              const skewY = (90 - (360 / segments.length));
              return (
                <Segment
                  key={segment.id}
                  rotate={rotate}
                  skewY={skewY}
                  color={segment.color}
                >
                  <div style={{ transform: `rotate(${rotate + skewY/2}deg)` }}>
                    {segment.label}
                  </div>
                </Segment>
              );
            })}
          </Wheel>
          <SpinButton onClick={handleSpin} disabled={isSpinning}>
            {isSpinning ? '...' : 'SPIN'}
          </SpinButton>
        </WheelContainer>
        <p className="text-sm text-gray-600 mt-4">Try your luck to win exclusive offers!</p>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SpinWheel; 