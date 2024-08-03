export interface iReportDeposit {
  trash_id?: string;
  location_id?: string;
  start_date: string;
  end_date: string;
}

export interface DepositStatistic {
  total: number;
  date: string;
}

export interface iResponeReportDeposit {
  code: number;
  message: string;
  status: string;
  data: DepositStatistic[];
}

export interface iReportReward {
  start_date: string;
  end_date: string;
}

export interface RewardStatistic {
  total: number;
  reward_name: string;
  date: string;
}

export interface iResponeReportReward {
  code: number;
  message: string;
  status: string;
  data: RewardStatistic[];
}
