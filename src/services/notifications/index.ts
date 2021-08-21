import { LedgerTransactionType } from "@domain/ledger"
import { NotificationsServiceError } from "@domain/notifications"
import { User } from "@services/mongoose/schema"
import { transactionNotification } from "./payment"

export const NotificationsService = (logger: Logger): INotificationsService => {
  const onChainTransactionReceived = async ({
    amount,
    walletId,
    txId,
  }: TransactionReceivedArgs) => {
    try {
      // work around to move forward before re-wrighting the whole notifications module
      const user = await User.findOne({ _id: walletId })
      transactionNotification({
        type: LedgerTransactionType.OnchainReceipt,
        user,
        logger: logger,
        amount,
        txid: txId,
      })
    } catch (err) {
      return new NotificationsServiceError(err)
    }
  }
  return { onChainTransactionReceived }
}