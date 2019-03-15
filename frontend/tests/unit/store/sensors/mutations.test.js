import { mutations } from '@/store/sensors.module';
import { dosisMods } from '@/shared_config/dosisMods';

const { SOCKET_DATUM } = mutations;

describe('SOCKET_DATUM mutation', () => {
  test('updates zee prime sensor readings', () => {
    const state = dosisMods;
    const testMessage = { message: { OD: '1.318', Temperature: '33.750', module: 'ZeePrime' } };
    const { OD, Temperature } = testMessage.message;

    SOCKET_DATUM(dosisMods, testMessage);

    expect(state.ZeePrime).toEqual({ temperature: Temperature, OD });
  });
  test('updates MV1 sensor readings', () => {
    const state = dosisMods;
    const testMessage = { message: { OD: '1.318', Temperature: '33.750', module: 'MV1' } };
    const { OD, Temperature } = testMessage.message;

    SOCKET_DATUM(dosisMods, testMessage);

    expect(state.MV1).toEqual({ temperature: Temperature, OD });
  });
});
