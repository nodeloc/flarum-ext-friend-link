<?php

namespace Nodeloc\VPS\Command;

use Nodeloc\VPS\Model\CurrencyRate;
use Flarum\Console\AbstractCommand;
use Flarum\Foundation\Paths;
use Illuminate\Support\Facades\Http;
class UpdateCurrencyRates extends AbstractCommand
{

    protected function configure()
    {
        $this
            ->setName('vps:currency-rates')
            ->setDescription('Update currency rates from external API');
    }
    /**
     *
     * 发送邮件
     *
     * @return void
     */
    private function update_currency_rates()
    {
        $this->info('Currency rates updated start.');
        // 构建请求 URL
        $url = "https://v6.exchangerate-api.com/v6/73f047a184a6be55c3aeb063/latest/CNY";

        // 发起 HTTP 请求
        $response = file_get_contents($url);

        // 解析 JSON 响应
        $responseData = json_decode($response, true);

        // 检查请求是否成功
        if ($responseData && isset($responseData['result']) && $responseData['result'] === 'success') {
            // 获取汇率数据
            $conversionRates = $responseData['conversion_rates'];

            // 更新数据库中的汇率
            foreach ($conversionRates as $currencyCode => $rate) {
                CurrencyRate::updateOrCreate(
                    ['currency' => $currencyCode],
                    ['rate' => $rate]
                );
            }

            $this->info('Currency rates updated successfully.');
        } else {
            $this->error('Failed to update currency rates.');
        }
    }

    protected function fire()
    {
        $this->update_currency_rates();
    }

}
