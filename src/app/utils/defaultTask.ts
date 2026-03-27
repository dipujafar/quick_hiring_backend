import { USER_ROLE } from '../modules/user/user.constants';
import { User } from '../modules/user/user.models';

export async function defaultTask() {
  // Add your default task here

  // check admin is exist
  const admin = await User.findOne({ role: USER_ROLE?.admin });
  if (!admin) {
    await User.create({
      name: 'Jafar Uddin Dipu',
      email: 'admin@gmail.com',
      phoneNumber: '+8801613790366',
      password: '112233',
      role: 'admin',
      verification: {
        otp: '0',
        status: true,
      },
    });
  }
}
