export default {
    spam_patterns: {
        title_tag_modal: "Gán nhãn mẫu",
        title_add_modal: "Thêm nhãn mẫu",
        label: "Nhãn",
        content: "Nội dung",
        warning: {
            portlet_title: "Danh sách cảnh báo",
            content: "Nội dung",
            count_content: "Số tin",
            count_spam: "Số tin bị chặn",
            count_calling: "Số TB gửi",
            count_called: "Số TB nhận",
            spam_application: "Nguồn",
            when_created: "Ngày khởi tạo",
            action: "Hành động",
            enter_content: "Nhập nội dung",
            select_spam_application: "Chọn nguồn",
            enter_when_created_start: "Nhập ngày bắt đầu",
            enter_when_created_finish: "Nhập ngày kết thúc",
            enter_content_title: "Nội dung",
            select_spam_application_placeholder: "Chọn một nguồn",
            search_placeholder: "Nhập từ khóa...",
            title_tag_modal: "Gán nhãn mẫu spam",
            notification_tag_error:
                "Quá trình gãn nhãn bị lỗi, vui lòng thử lại sau",
            notification_tag_success: "Gán nhãn thành công",
            notification_ignore_error:
                "Quá trình loại bỏ bị lỗi, vui lòng thử lại sau",
            notification_ignore_success: "Loại bỏ thành công",
            must_select_at_least_one_record:
                "Bạn phải chọn tối thiểu một bản ghi",
            ignore_confirm: "Bạn có chắc chắn muốn bỏ qua các nhãn này không?"
        },
        labeled: {
            portlet_title: "Danh sách spam đã gán nhãn",
            content: "Nội dung",
            spam_application: "Nguồn",
            when_updated: "Ngày cập nhật",
            action: "Hành động",
            enter_content: "Nhập nội dung",
            select_spam_application: "Chọn nguồn",
            enter_when_created_start: "Nhập ngày bắt đầu",
            enter_when_created_finish: "Nhập ngày kết thúc",
            enter_content_title: "Nội dung",
            select_spam_application_placeholder: "Chọn một nguồn",
            search_placeholder: "Nhập từ khóa...",
            title_tag_modal: "Gán nhãn mẫu spam",
            notification_tag_error:
                "Quá trình gãn nhãn bị lỗi, vui lòng thử lại sau",
            notification_tag_success: "Gán nhãn thành công",
            notification_ignore_error:
                "Quá trình loại bỏ bị lỗi, vui lòng thử lại sau",
            notification_ignore_success: "Loại bỏ thành công",
            must_select_at_least_one_record:
                "Bạn phải chọn tối thiểu một bản ghi",
            ignore_confirm: "Bạn có chắc chắn muốn bỏ qua các nhãn này không?",
            spam_label: "Nhãn",
            who_updated: "Người cập nhật",
            notification_add_error:
                "Quá trình thêm nhãn bị lỗi, vui lòng thử lại sau",
            notification_add_success: "Thêm nhãn thành công"
        },
        noti: {
            no_record: "Không có bàn ghi để export",
            export_error: "Quá trình export gặp sự cố, vui lòng thử lại sau"
        },
        white: {
            add_white: "Thêm mẫu",
            edit_white: "Chỉnh sửa mãu",
            content: "Nội dung mẫu",
            type: "Loại",
            status: "Trạng thái",
            datatable: {
                title: "Danh sách tin nhắn White",
                columns: {
                    content: "Nội dung mẫu",
                    type: "Loại",
                    sync: "Đồng bộ"
                }
            },
            placeholder: {
                content: "Nhập nội dung mẫu",
                type: "Chọn loại"
            },
            import_title: "Import mẫu tin nhắn",
            import_modal: {
                wait_import:
                    "Quá trình Import có thể mất một khoảng thời gian, vui lòng không thoát tab làm việc",
                report: "Ghi chú",
                import: "Import từ file excel( có file mẫu import bên dưới)",
                example_file: "File mẫu import",
                file: "File mẫu",
                note: "Chú ý",
                select_file: "Chọn file tải lên"
            },
            sync: "Đồng bộ",
            history_modal: {
                title: "Xem lịch sử",
                information: "Thông tin hiện tại",
                history_content: "Lịch sử tác động mẫu"
            }
        },
        keyword: {
            add_keyword: "Thêm từ khóa",
            edit_keyword: "Chỉnh từ khóa",
            value: "Từ khóa",
            type: "Loại",
            status: "Trạng thái",
            reason: "Lý do",
            datatable: {
                title: "Danh sách chặn tin nhắn theo từ khóa",
                columns: {
                    value: "Từ khóa",
                    type: "Loại",
                    reason: "Lý do",
                    sync: "Đồng bộ"
                }
            },
            placeholder: {
                value: "Nhập từ khóa",
                reason: "Nhập lí do",
                type: "Chọn loại"
            },
            import_title: "Import từ khóa mới",
            import_modal: {
                wait_import:
                    "Quá trình Import có thể mất một khoảng thời gian, vui lòng không thoát tab làm việc",
                report: "Ghi chú",
                import:
                    "Import từ khóa từ file excel( có file mẫu import bên dưới)",
                example_file: "File mẫu import",
                file: "File mẫu",
                note: "Chú ý",
                select_file: "Chọn file tải lên"
            }
        }
    },
    statistic: {
        pattern: {
            title: "Mẫu tin",
            total: "Tổng mẫu nhận diện:",
            spam: "Số mẫu gán nhãn spam:",
            ham: "Số mẫu gán nhãn tốt:",
            ignore: "Số mẫu bỏ qua:",
            customer_feedback: "Tổng mẫu gửi tới 9198:",
            customer_feedback_spam: "Số mẫu gửi tới 9198 được gán nhãn spam:"
        },
        phone: {
            title: "Thuê bao",
            internal_banned: "Số thuê bao chặn 1 chiều nội mạng:",
            external_banned: "Số thuê bao chặn 1 chiều ngoại mạng:",
            ignore: "Số thuê bao bỏ qua:"
        },
        flow: {
            total: "Tổng tin nhắn",
            spam: "Tin nhắn spam",
            warn: "Tin nhắn warn"
        },
        missing: {
            title: "Danh sách rà soát chặn thiếu",
            content: "Nội dung mẫu",
            count_content: "Số lượt tin",
            label_name: "Nhãn",
            time: "Thời gian",
            review_progress: "Tiến độ rà soát"
        },
        wrong: {
            title: "Danh sách rà soát chặn sai",
            content: "Nội dung mẫu",
            count_content: "Số lượt tin",
            count_calling: "Số thuê bao gửi",
            count_called: "Số thuê bao nhận",
            label_name: "Nhãn",
            time: "Thời gian",
            review_progress: "Tiến độ rà soát"
        }
    },
    tool: {
        hot_regex: {
            title: "Danh sách biểu thức chính quy",
            regex: "Biểu thức chính quy",
            time: "Thời gian"
        },
        label: {
            title: "Danh sách nhãn",
            name: "Mã nhãn",
            display_name: "Tên nhãn",
            parent: "Nhóm nhãn",
            placeholder: {
                name: "Nhập mã nhãn",
                display_name: "Nhập tên nhãn",
                parent: "Chọn nhóm nhãn"
            }
        }
    },
    phone: {
        blackwhite: {
            title: "Danh sách cặp Black/White",
            target_number: "Thuê bao gửi",
            black_white_number: "Thuê bao nhận",
            list_type: "Loại",
            reason: "Lí do",
            placeholder: {
                target_number: "Nhập thuê bao gửi",
                black_white_number: "Nhập thuê bao nhận",
                list_type: "Chọn loại",
                reason: "Nhập lí do"
            }
        },
        type: {
            title: "Danh sách thuê bao",
            calling_number: "Thuê bao gửi",
            carrier: "Nhà mạng",
            list_type: "Danh sách",
            reason: "Lí do",
            store_log: "Lưu log",
            placeholder: {
                calling_number: "Nhập thuê bao gửi",
                reason: "Nhập lí do",
                store_log: "Chọn lưu log",
                list_type: "Chọn danh sách",
                carrier: "Chọn nhà mạng"
            }
        },
        logtrace: {
            title: "Danh sách tra cứu log thuê bao",
            request_content: "Số điện thoại yêu cầu",
            from_time: "Từ",
            to_time: "Đến",
            placeholder: {
                request_content: "Nhập số"
            }
        },
        query: {
            calling_info: "Thông tin thuê bao",
            calling_number: "Thuê bao gửi",
            carrier: "Nhà mạng",
            list_type: "Danh sách",
            active: "Trạng thái",
            count_opened: "Số lần đã mở",
            count_banned: "Số lần đã khóa",
            history: "Lịch sử tác động",
            detail: "Chi tiết mẫu đã gửi",
            content: "Nội dung",
            content_type: "Loại nội dung",
            count_content: "Số tin",
            count_called: "Số thuê bao nhận",
            action_type: "Loại tác động",
            resolved: "Đã xử lý"
        },
        processed: {
            title: "Theo dõi thuê bao đã xử lý",
            calling_number: "Thuê bao gửi",
            count_content: "Số tin",
            count_called: "Số thuê bao nhận",
            carrier: "Nhà mạng",
            list_type: "Danh sách",
            content: "Hành vi",
            content_type: "Loại nội dung",
            active: "Trạng thái",
            detail: "Chi tiết thuê bao",
            calling_info: "Thông tin thuê bao",
            count_opened: "Số lần đã mở",
            count_banned: "Số lần đã khóa",
            action_type: "Loại tác động",
            resolved: "Đã xử lý"
        },
        warning: {
            title: "Cảnh báo thuê bao Spam",
            propose: "Đề xuất mở/khóa thuê bao",
            apply: "Duyệt khóa",
            calling_number: "Thuê bao gửi",
            count_content: "Số tin",
            count_called: "Số thuê bao nhận",
            count_block: "Số tin chặn",
            content: "Hành vi",
            carrier: "Nhà mạng",
            list_type: "Danh sách",
            active: "Trạng thái",
            placeholder: {
                calling_number: "Nhập thuê bao gửi",
                reason: "Nhập lí do"
            }
        }
    }
};
