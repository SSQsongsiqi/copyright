total_vue=$(find src -name "*.vue" | xargs cat | wc -l)
total_ts=$(find src -name "*.ts" | xargs cat | wc -l)

total=$((total_vue + total_ts))

echo "Total lines: $total"