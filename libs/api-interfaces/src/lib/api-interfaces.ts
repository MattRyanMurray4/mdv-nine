export interface Weapon {
  id: string;
  name: string;
  type: string;
  description: string;
  famousUse: string;
  effectiveRange: string;
  decomissioned: boolean;
}

export const emptyWeapon = {
  id: '',
  name: '',
  type: '',
  description: '',
  famousUse: '',
  effectiveRange: '',
  decomissioned: false,
};
